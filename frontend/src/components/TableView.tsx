import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
    Badge,
    Button,
    Flex,
    Text,
    Box,
} from '@chakra-ui/react';
import type { Book, SortField, SortDirection } from '../types';

interface TableViewProps {
    books: Book[];
    selectedIds: Set<number>;
    sortField: SortField;
    sortDirection: SortDirection;
    onSort: (field: SortField) => void;
    onSelectAll: (checked: boolean) => void;
    onSelectOne: (id: number, checked: boolean) => void;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
}

const SortIcon = ({ active, direction }: { active: boolean; direction: SortDirection }) => {
    if (!active) {
        return <span style={{ opacity: 0.3, marginLeft: '4px' }}>↕</span>;
    }
    return <span style={{ marginLeft: '4px' }}>{direction === 'asc' ? '↑' : '↓'}</span>;
};

const TableView = ({
    books,
    selectedIds,
    sortField,
    sortDirection,
    onSort,
    onSelectAll,
    onSelectOne,
    onEdit,
    onDelete,
}: TableViewProps) => {
    const allSelected = books.length > 0 && books.every(book => selectedIds.has(book.id));
    const someSelected = books.some(book => selectedIds.has(book.id)) && !allSelected;

    return (
        <Box bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm">
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead bg="gray.50" position="sticky" top={0} zIndex={1}>
                        <Tr>
                            <Th width="50px" py={4}>
                                <Checkbox
                                    isChecked={allSelected}
                                    isIndeterminate={someSelected}
                                    onChange={(e) => onSelectAll(e.target.checked)}
                                    colorScheme="brand"
                                    aria-label="Select all books"
                                />
                            </Th>
                            <Th
                                width="80px"
                                cursor="pointer"
                                onClick={() => onSort('id')}
                                _hover={{ bg: 'gray.100' }}
                                transition="background 0.2s"
                                userSelect="none"
                            >
                                <Flex align="center">
                                    ID
                                    <SortIcon active={sortField === 'id'} direction={sortDirection} />
                                </Flex>
                            </Th>
                            <Th
                                width="150px"
                                cursor="pointer"
                                onClick={() => onSort('category')}
                                _hover={{ bg: 'gray.100' }}
                                transition="background 0.2s"
                                userSelect="none"
                            >
                                <Flex align="center">
                                    Category
                                    <SortIcon active={sortField === 'category'} direction={sortDirection} />
                                </Flex>
                            </Th>
                            <Th
                                cursor="pointer"
                                onClick={() => onSort('name')}
                                _hover={{ bg: 'gray.100' }}
                                transition="background 0.2s"
                                userSelect="none"
                            >
                                <Flex align="center">
                                    Book Name
                                    <SortIcon active={sortField === 'name'} direction={sortDirection} />
                                </Flex>
                            </Th>
                            <Th display={{ base: 'none', lg: 'table-cell' }}>Description</Th>
                            <Th width="150px">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {books.map((book) => (
                            <Tr
                                key={book.id}
                                _hover={{ bg: 'gray.50' }}
                                transition="background 0.15s"
                                bg={selectedIds.has(book.id) ? 'brand.50' : 'transparent'}
                            >
                                <Td>
                                    <Checkbox
                                        isChecked={selectedIds.has(book.id)}
                                        onChange={(e) => onSelectOne(book.id, e.target.checked)}
                                        colorScheme="brand"
                                        aria-label={`Select ${book.name}`}
                                    />
                                </Td>
                                <Td>
                                    <Text fontSize="sm" color="gray.500">
                                        #{book.id}
                                    </Text>
                                </Td>
                                <Td>
                                    <Badge
                                        colorScheme="brand"
                                        borderRadius="full"
                                        px={3}
                                        py={1}
                                        textTransform="capitalize"
                                        fontSize="xs"
                                    >
                                        {book.category}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Text
                                        fontWeight="medium"
                                        color="gray.800"
                                        cursor="pointer"
                                        _hover={{ color: 'brand.600' }}
                                        onClick={() => onEdit(book)}
                                    >
                                        {book.name}
                                    </Text>
                                </Td>
                                <Td display={{ base: 'none', lg: 'table-cell' }}>
                                    <Text
                                        color="gray.600"
                                        fontSize="sm"
                                        noOfLines={2}
                                        maxW="400px"
                                    >
                                        {book.description}
                                    </Text>
                                </Td>
                                <Td>
                                    <Flex gap={2}>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            colorScheme="gray"
                                            onClick={() => onEdit(book)}
                                            _hover={{ bg: 'brand.50', color: 'brand.600' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            colorScheme="red"
                                            onClick={() => onDelete(book)}
                                            _hover={{ bg: 'red.50' }}
                                        >
                                            Delete
                                        </Button>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default TableView;
