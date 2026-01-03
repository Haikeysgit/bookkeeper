import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';

interface EmptyStateProps {
    type: 'empty' | 'no-results';
    searchQuery?: string;
    onClearFilters?: () => void;
    onAddBook?: () => void;
}

// Simple book icon using SVG
const BookIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
    </svg>
);

const EmptyState = ({ type, searchQuery, onClearFilters, onAddBook }: EmptyStateProps) => {
    const isNoResults = type === 'no-results';

    return (
        <Box
            textAlign="center"
            py={20}
            px={6}
            bg="white"
            borderRadius="xl"
            border="1px dashed"
            borderColor="gray.200"
        >
            <VStack spacing={6}>
                <Box color="gray.300">
                    <BookIcon />
                </Box>

                <VStack spacing={2}>
                    <Heading size="lg" color="gray.700">
                        {isNoResults ? 'No books match your search' : 'Your library is empty'}
                    </Heading>
                    <Text fontSize="md" color="gray.500" maxW="md">
                        {isNoResults ? (
                            searchQuery ? (
                                <>No results found for <strong>"{searchQuery}"</strong>. Try different keywords or clear your filters.</>
                            ) : (
                                'No books match the current filters. Try adjusting your search criteria.'
                            )
                        ) : (
                            'Start building your collection by adding your first book'
                        )}
                    </Text>
                </VStack>

                {isNoResults ? (
                    onClearFilters && (
                        <Button
                            variant="outline"
                            colorScheme="brand"
                            onClick={onClearFilters}
                            size="lg"
                        >
                            Clear Filters
                        </Button>
                    )
                ) : (
                    onAddBook && (
                        <Button
                            colorScheme="brand"
                            onClick={onAddBook}
                            size="lg"
                            leftIcon={<span>+</span>}
                        >
                            Add Your First Book
                        </Button>
                    )
                )}
            </VStack>
        </Box>
    );
};

export default EmptyState;
