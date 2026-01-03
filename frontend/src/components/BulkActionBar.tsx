import { Box, Flex, Text, Button, Link } from '@chakra-ui/react';

interface BulkActionBarProps {
    selectedCount: number;
    onDelete: () => void;
    onClearSelection: () => void;
}

const BulkActionBar = ({ selectedCount, onDelete, onClearSelection }: BulkActionBarProps) => {
    if (selectedCount === 0) return null;

    return (
        <Box
            position="sticky"
            top="80px"
            zIndex="banner"
            mb={4}
            animation="slideDown 0.2s ease-out"
        >
            <Flex
                bg="brand.50"
                borderRadius="lg"
                p={4}
                align="center"
                justify="space-between"
                border="1px"
                borderColor="brand.200"
                boxShadow="sm"
            >
                <Text fontWeight="medium" color="brand.900">
                    <strong>{selectedCount}</strong> {selectedCount === 1 ? 'book' : 'books'} selected
                </Text>
                <Flex gap={3} align="center">
                    <Link
                        color="brand.600"
                        fontSize="sm"
                        fontWeight="medium"
                        onClick={onClearSelection}
                        cursor="pointer"
                        _hover={{ color: 'brand.700', textDecoration: 'underline' }}
                    >
                        Clear Selection
                    </Link>
                    <Button
                        colorScheme="red"
                        size="sm"
                        onClick={onDelete}
                        leftIcon={<span>🗑️</span>}
                    >
                        Delete Selected
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default BulkActionBar;
