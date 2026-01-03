import {
    Flex,
    Button,
    Text,
    Select,
    HStack,
    IconButton,
} from '@chakra-ui/react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (count: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) => {
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 7;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first, last, current and surrounding pages
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'stretch', md: 'center' }}
            gap={4}
            mt={6}
            pt={6}
            borderTop="1px"
            borderColor="gray.200"
        >
            {/* Items info and per-page selector */}
            <Flex
                gap={4}
                align="center"
                direction={{ base: 'column', sm: 'row' }}
                justify={{ base: 'center', md: 'flex-start' }}
            >
                <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                    Showing <strong>{startItem}-{endItem}</strong> of <strong>{totalItems}</strong> books
                </Text>
                <Flex align="center" gap={2}>
                    <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                        Items per page:
                    </Text>
                    <Select
                        size="sm"
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        width="80px"
                        focusBorderColor="brand.500"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </Select>
                </Flex>
            </Flex>

            {/* Page navigation */}
            <HStack spacing={1} justify={{ base: 'center', md: 'flex-end' }}>
                <IconButton
                    aria-label="Previous page"
                    icon={<span>←</span>}
                    onClick={() => onPageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    size="sm"
                    variant="ghost"
                />

                {pageNumbers.map((page, index) => (
                    typeof page === 'number' ? (
                        <Button
                            key={index}
                            onClick={() => onPageChange(page)}
                            size="sm"
                            variant={currentPage === page ? 'solid' : 'ghost'}
                            colorScheme={currentPage === page ? 'brand' : 'gray'}
                            minW="40px"
                        >
                            {page}
                        </Button>
                    ) : (
                        <Text key={index} px={2} color="gray.400">
                            {page}
                        </Text>
                    )
                ))}

                <IconButton
                    aria-label="Next page"
                    icon={<span>→</span>}
                    onClick={() => onPageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    size="sm"
                    variant="ghost"
                />
            </HStack>
        </Flex>
    );
};

export default Pagination;
