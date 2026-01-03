import {
    Box,
    SimpleGrid,
    Card,
    CardBody,
    CardFooter,
    Skeleton,
    SkeletonText,
    Stack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import type { ViewMode } from '../types';

interface LoadingSkeletonProps {
    viewMode: ViewMode;
    count?: number;
}

const TableSkeleton = ({ count = 6 }: { count: number }) => (
    <Box bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm">
        <Table variant="simple">
            <Thead bg="gray.50">
                <Tr>
                    <Th width="50px"><Skeleton height="20px" /></Th>
                    <Th width="80px"><Skeleton height="20px" /></Th>
                    <Th width="150px"><Skeleton height="20px" /></Th>
                    <Th><Skeleton height="20px" /></Th>
                    <Th><Skeleton height="20px" /></Th>
                    <Th width="150px"><Skeleton height="20px" /></Th>
                </Tr>
            </Thead>
            <Tbody>
                {Array.from({ length: count }).map((_, index) => (
                    <Tr key={index}>
                        <Td><Skeleton height="20px" width="20px" /></Td>
                        <Td><Skeleton height="20px" /></Td>
                        <Td><Skeleton height="24px" borderRadius="full" /></Td>
                        <Td><Skeleton height="20px" /></Td>
                        <Td><SkeletonText noOfLines={1} /></Td>
                        <Td>
                            <Stack direction="row" spacing={2}>
                                <Skeleton height="32px" width="60px" />
                                <Skeleton height="32px" width="60px" />
                            </Stack>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </Box>
);

const CardSkeleton = ({ count = 6 }: { count: number }) => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {Array.from({ length: count }).map((_, index) => (
            <Card key={index} h="100%">
                <CardBody>
                    <Stack spacing={3}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Skeleton height="24px" width="100px" borderRadius="full" />
                            <Skeleton height="16px" width="50px" />
                        </Box>
                        <Skeleton height="28px" width="70%" />
                        <SkeletonText noOfLines={3} spacing={2} />
                    </Stack>
                </CardBody>
                <CardFooter pt={0}>
                    <Stack direction="row" spacing={2} w="full">
                        <Skeleton height="40px" flex={1} />
                        <Skeleton height="40px" flex={1} />
                    </Stack>
                </CardFooter>
            </Card>
        ))}
    </SimpleGrid>
);

const LoadingSkeleton = ({ viewMode, count = 6 }: LoadingSkeletonProps) => {
    return (
        <Box>
            {viewMode === 'table' ? (
                <TableSkeleton count={count} />
            ) : (
                <CardSkeleton count={count} />
            )}
            <Box textAlign="center" mt={4}>
                <SkeletonText noOfLines={1} width="150px" mx="auto" />
            </Box>
        </Box>
    );
};

export default LoadingSkeleton;
