import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Heading, Text, Button, Code, VStack, Container } from '@chakra-ui/react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class FrontendErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <Container maxW="container.md" centerContent py={20}>
                    <VStack spacing={6} align="start" w="full" bg="red.50" p={8} borderRadius="xl" border="1px solid" borderColor="red.200">
                        <Heading size="lg" color="red.600">Something went wrong 😢</Heading>
                        <Text>The application encountered an unexpected error.</Text>

                        <Box w="full" bg="white" p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
                            <Heading size="xs" mb={2} color="gray.500">Error Message:</Heading>
                            <Code display="block" colorScheme="red" p={2} borderRadius="md">
                                {this.state.error?.message || 'Unknown Error'}
                            </Code>
                        </Box>

                        <Box w="full" bg="white" p={4} borderRadius="md" border="1px solid" borderColor="gray.200">
                            <Heading size="xs" mb={2} color="gray.500">Stack Trace Component:</Heading>
                            <Code display="block" whiteSpace="pre" fontSize="xs" overflowX="auto">
                                {this.state.errorInfo?.componentStack || 'No stack trace available'}
                            </Code>
                        </Box>

                        <Button colorScheme="red" onClick={() => window.location.reload()}>
                            Reload Application
                        </Button>
                    </VStack>
                </Container>
            );
        }

        return this.props.children;
    }
}
