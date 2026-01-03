import {
    Box,
    SimpleGrid,
    Heading,
    Text,
    Flex,
    Button,
    Badge,
    useToast,
    useDisclosure,
    HStack,
    IconButton,
    Spacer,
    Progress,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Grid as GridIcon,
    List as ListIcon,
    Filter,
    BookOpen,
    Zap,
    Edit2,
    Trash2,
    Plus
} from 'lucide-react';
import type { Book, ViewMode, SortField, SortDirection } from '../types';
import BookModal from './BookModal';
import TableView from './TableView';
import EmptyState from './EmptyState';
import LoadingSkeleton from './LoadingSkeleton';
import Pagination from './Pagination';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_BOOKS, DELETE_BOOK } from '../graphql/queries';

// Motion Components
const MotionBox = motion(Box);
const MotionCard = motion(Box);

const BookList = () => {
    // GraphQL Data
    const { loading, error, data, refetch: refetchBooks } = useQuery(GET_BOOKS);
    const [deleteBook] = useMutation(DELETE_BOOK);

    // Local State
    const [viewMode, setViewMode] = useState<ViewMode>('grid'); // Default to grid for visual impact
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortField, setSortField] = useState<SortField>('id');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedBookIds, setSelectedBookIds] = useState<Set<number>>(new Set());
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [bulkDeleteMode, setBulkDeleteMode] = useState(false);

    const toast = useToast();
    const { isOpen: isDeleteDialogOpen, onOpen: onOpenDeleteDialog, onClose: onCloseDeleteDialog } = useDisclosure();

    // Derived Data
    const books: Book[] = data?.books || [];
    const categories = useMemo(() => Array.from(new Set(books.map((b: Book) => b.category || 'General'))).sort(), [books]);

    const filteredBooks = useMemo(() => {
        let result = books;
        if (selectedCategory !== 'all') {
            result = result.filter(book => book.category === selectedCategory);
        }
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(book =>
                book.name.toLowerCase().includes(query) ||
                book.description.toLowerCase().includes(query) ||
                (book.category || '').toLowerCase().includes(query)
            );
        }
        return result;
    }, [books, selectedCategory, searchQuery]);

    const sortedBooks = useMemo(() => {
        const sorted = [...filteredBooks];
        sorted.sort((a, b) => {
            let aVal: string | number = a[sortField];
            let bVal: string | number = b[sortField];
            if (aVal === undefined) aVal = '';
            if (bVal === undefined) bVal = '';
            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredBooks, sortField, sortDirection]);

    const paginatedBooks = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedBooks.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedBooks, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleDeleteClick = (book: Book) => { setBookToDelete(book); setBulkDeleteMode(false); onOpenDeleteDialog(); };
    const handleBulkDeleteClick = () => { setBulkDeleteMode(true); onOpenDeleteDialog(); };

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            if (bulkDeleteMode) {
                const idsToDelete = Array.from(selectedBookIds);
                await Promise.all(idsToDelete.map(id => deleteBook({ variables: { id } })));
                setSelectedBookIds(new Set());
                toast({ title: 'Books deleted', status: 'success' });
            } else if (bookToDelete) {
                await deleteBook({ variables: { id: bookToDelete.id } });
                toast({ title: 'Book deleted', status: 'success' });
            }
            await refetchBooks();
            onCloseDeleteDialog();
        } catch (error: any) {
            toast({ title: 'Error deleting', description: error.message, status: 'error' });
        } finally {
            setIsDeleting(false);
            setBookToDelete(null);
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) setSelectedBookIds(new Set(paginatedBooks.map(b => b.id)));
        else setSelectedBookIds(new Set());
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        const newSelected = new Set(selectedBookIds);
        if (checked) newSelected.add(id);
        else newSelected.delete(id);
        setSelectedBookIds(newSelected);
    };

    const handleClearSelection = () => setSelectedBookIds(new Set());
    const handlePageChange = (page: number) => { setCurrentPage(page); setSelectedBookIds(new Set()); };
    const handleItemsPerPageChange = (count: number) => { setItemsPerPage(count); setCurrentPage(1); setSelectedBookIds(new Set()); };
    const handleClearFilters = () => { setSearchQuery(''); setSelectedCategory('all'); setCurrentPage(1); refetchBooks(); };

    // Stats Logic
    const stats = {
        totalBooks: books.length,
        totalCategories: categories.length,
    };

    const booksToDeleteNames = useMemo(() => {
        if (bulkDeleteMode) return books.filter((b: Book) => selectedBookIds.has(b.id)).map((b: Book) => b.name);
        return bookToDelete ? [bookToDelete.name] : [];
    }, [bulkDeleteMode, selectedBookIds, bookToDelete, books]);

    const hasNoResults = !loading && !error && books.length > 0 && filteredBooks.length === 0;
    const isLibraryEmpty = !loading && !error && books.length === 0;

    return (
        <Box animation="fadeIn 0.5s ease-in-out">
            {/* STATS DASHBOARD */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
                {/* Card 1: Total Books */}
                <MotionBox
                    bgGradient="linear(to-br, brand.500, purple.600)"
                    p={6}
                    borderRadius="2xl"
                    color="white"
                    whileHover={{ scale: 1.02 }}
                    boxShadow="xl"
                >
                    <Flex justifyContent="space-between" alignItems="start">
                        <Box>
                            <Text fontSize="sm" fontWeight="medium" opacity={0.8}>Total Books</Text>
                            <Heading size="2xl" mt={2}>{stats.totalBooks}</Heading>
                        </Box>
                        <Box p={3} bg="whiteAlpha.300" borderRadius="xl">
                            <BookOpen size={24} color="white" />
                        </Box>
                    </Flex>
                    <Text fontSize="xs" mt={4} display="flex" alignItems="center">
                        <Zap size={12} style={{ marginRight: '6px' }} /> {stats.totalBooks > 0 ? 'Library Active' : 'Start Collecting'}
                    </Text>
                </MotionBox>

                {/* Card 2: Categories */}
                <MotionBox
                    bg="white"
                    p={6}
                    borderRadius="2xl"
                    boxShadow="sm"
                    border="1px solid"
                    borderColor="gray.100"
                    whileHover={{ scale: 1.02, translateY: -5 }}
                >
                    <Flex justifyContent="space-between" alignItems="start">
                        <Box>
                            <Text fontSize="sm" fontWeight="medium" color="gray.500">Categories</Text>
                            <Heading size="2xl" mt={2} color="gray.800">{stats.totalCategories}</Heading>
                        </Box>
                        <Box p={3} bg="purple.50" borderRadius="xl">
                            <Filter size={24} color="#9333ea" />
                        </Box>
                    </Flex>
                    <Progress value={80} size="xs" colorScheme="purple" mt={4} borderRadius="full" />
                </MotionBox>
            </SimpleGrid>


            <Box
                position="sticky"
                top="90px"
                zIndex={90}
                mb={8}
                bg="whiteAlpha.80"
                backdropFilter="blur(12px)"
                borderRadius="2xl"
                p={4}
                boxShadow="lg"
                border="1px solid"
                borderColor="whiteAlpha.400"
            >
                <Flex direction={{ base: 'column', md: 'row' }} gap={4} alignItems="center">

                    {/* Filter Pills */}
                    <HStack overflowX="auto" pb={{ base: 2, md: 0 }} spacing={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        <Button
                            size="sm"
                            borderRadius="full"
                            variant={selectedCategory === 'all' ? 'solid' : 'ghost'}
                            onClick={() => setSelectedCategory('all')}
                        >
                            All
                        </Button>
                        {categories.map(cat => (
                            <Button
                                key={cat}
                                size="sm"
                                borderRadius="full"
                                variant={selectedCategory === cat ? 'solid' : 'ghost'}
                                bg={selectedCategory === cat ? 'purple.100' : undefined}
                                color={selectedCategory === cat ? 'purple.700' : 'gray.600'}
                                _hover={{ bg: selectedCategory === cat ? 'purple.200' : 'gray.100' }}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </HStack>

                    <Spacer />

                    {/* View Toggles */}
                    <HStack bg="gray.100" p={1} borderRadius="lg" spacing={0}>
                        <IconButton
                            aria-label="Grid View"
                            icon={<GridIcon size={18} />}
                            size="sm"
                            variant={viewMode === 'grid' ? 'white' : 'ghost'}
                            bg={viewMode === 'grid' ? 'white' : 'transparent'}
                            shadow={viewMode === 'grid' ? 'sm' : 'none'}
                            onClick={() => setViewMode('grid')}
                            borderRadius="md"
                        />
                        <IconButton
                            aria-label="Table View"
                            icon={<ListIcon size={18} />}
                            size="sm"
                            variant={viewMode === 'table' ? 'white' : 'ghost'}
                            bg={viewMode === 'table' ? 'white' : 'transparent'}
                            shadow={viewMode === 'table' ? 'sm' : 'none'}
                            onClick={() => setViewMode('table')}
                            borderRadius="md"
                        />
                    </HStack>

                    {/* Add Book Button with Special Styling */}
                    <Box>
                        <BookModal
                            refetch={refetchBooks}
                            triggerButton={
                                <Button
                                    leftIcon={<Plus />}
                                    bgGradient="linear(to-r, brand.500, purple.600)"
                                    color="white"
                                    _hover={{ bgGradient: 'linear(to-r, brand.600, purple.700)', transform: 'translateY(-1px)', shadow: 'lg' }}
                                    _active={{ transform: 'scale(0.98)' }}
                                    size="lg"
                                    borderRadius="xl"
                                    px={6}
                                >
                                    Add Book
                                </Button>
                            }
                        />
                    </Box>
                </Flex>
            </Box>

            {/* ERROR / LOADING / CONTENT */}
            <Box minH="400px">
                {error ? (
                    <Box textAlign="center" py={12} bg="red.50" borderRadius="3xl" border="1px dashed" borderColor="red.200">
                        <Box display="inline-block" p={4} bg="red.100" borderRadius="full" mb={4}>
                            <Zap size={32} color="#dc2626" />
                        </Box>
                        <Heading size="md" mb={2} color="red.800">Connection Issue</Heading>
                        <Text color="red.600" mb={6} maxW="md" mx="auto">We couldn't fetch your library. This is usually fixable by restarting the backend.</Text>
                        <Button colorScheme="red" onClick={() => refetchBooks()}>Try Connection Again</Button>
                    </Box>
                ) : loading ? (
                    <LoadingSkeleton viewMode={viewMode} count={6} />
                ) : isLibraryEmpty ? (
                    <Box
                        textAlign="center"
                        py={20}
                        px={6}
                        bg="white"
                        borderRadius="2xl"
                        border="1px dashed"
                        borderColor="gray.200"
                    >
                        <Box color="gray.300" mb={6}>
                            <BookOpen size={64} strokeWidth={1.5} />
                        </Box>
                        <Heading size="lg" color="gray.700" mb={2}>Your library is empty</Heading>
                        <Text fontSize="md" color="gray.500" maxW="md" mx="auto" mb={6}>
                            Start building your collection by adding your first book
                        </Text>
                        <BookModal
                            refetch={refetchBooks}
                            triggerButton={
                                <Button
                                    leftIcon={<Plus />}
                                    bgGradient="linear(to-r, brand.500, purple.600)"
                                    color="white"
                                    _hover={{ bgGradient: 'linear(to-r, brand.600, purple.700)', shadow: 'lg' }}
                                    size="lg"
                                    borderRadius="xl"
                                    px={6}
                                >
                                    Add Your First Book
                                </Button>
                            }
                        />
                    </Box>
                ) : hasNoResults ? (
                    <EmptyState type="no-results" searchQuery={searchQuery} onClearFilters={handleClearFilters} />
                ) : viewMode === 'table' ? (
                    <TableView
                        books={paginatedBooks}
                        selectedIds={selectedBookIds}
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                        onSelectAll={handleSelectAll}
                        onSelectOne={handleSelectOne}
                        onEdit={(book) => { }}
                        onDelete={handleDeleteClick}
                    />
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        <AnimatePresence>
                            {paginatedBooks.map((book, index) => (
                                <MotionCard
                                    key={book.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    bg="white"
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    position="relative"
                                    boxShadow="lg"
                                    whileHover={{
                                        y: -8,
                                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                    }}
                                    border="1px solid"
                                    borderColor="gray.50"
                                >
                                    {/* Gradient Top Bar */}
                                    <Box h="6px" bgGradient={`linear(to-r, ${book.category === 'Engineering' ? 'blue.400, cyan.400' : book.category === 'Architecture' ? 'purple.400, pink.400' : 'green.400, teal.400'})`} />

                                    <Box p={6}>
                                        <Flex justify="space-between" align="start" mb={4}>
                                            <Badge
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                                bg={book.category === 'Engineering' ? 'blue.50' : 'purple.50'}
                                                color={book.category === 'Engineering' ? 'blue.600' : 'purple.600'}
                                                fontWeight="600"
                                                textTransform="capitalize"
                                                fontSize="xs"
                                            >
                                                {book.category || 'General'}
                                            </Badge>
                                            <Text fontSize="xs" color="gray.300" fontFamily="mono">#{book.id}</Text>
                                        </Flex>

                                        <Heading size="md" mb={3} color="gray.700" lineHeight="short">
                                            {book.name}
                                        </Heading>

                                        <Text color="gray.500" fontSize="sm" noOfLines={3} mb={6} lineHeight="relaxed">
                                            {book.description}
                                        </Text>

                                        <Flex pt={4} borderTop="1px solid" borderColor="gray.100" gap={3}>
                                            <Box flex={1}>
                                                <BookModal
                                                    refetch={refetchBooks}
                                                    initialBook={book}
                                                    triggerButton={
                                                        <Button size="sm" variant="ghost" w="full" leftIcon={<Edit2 size={16} />} color="gray.600">
                                                            Edit
                                                        </Button>
                                                    }
                                                />
                                            </Box>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                colorScheme="red"
                                                flex={1}
                                                leftIcon={<Trash2 size={16} />}
                                                onClick={() => handleDeleteClick(book)}
                                            >
                                                Delete
                                            </Button>
                                        </Flex>
                                    </Box>
                                </MotionCard>
                            ))}
                        </AnimatePresence>
                    </SimpleGrid>
                )}
            </Box>

            {!loading && !error && !hasNoResults && !isLibraryEmpty && (
                <Box mt={8}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        totalItems={sortedBooks.length}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </Box>
            )}

            <DeleteConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={onCloseDeleteDialog}
                onConfirm={handleDeleteConfirm}
                bookNames={booksToDeleteNames}
                isDeleting={isDeleting}
            />
        </Box>
    );
};

export default BookList;
