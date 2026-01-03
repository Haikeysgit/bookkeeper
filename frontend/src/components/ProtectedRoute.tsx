/**
 * Protected Route - Authentication Wrapper Component
 * 
 * Ensures users are authenticated before viewing protected content.
 * Handles three states:
 * 1. Loading - Shows spinner while checking auth status
 * 2. Not authenticated - Redirects to Auth0 login
 * 3. Authenticated - Renders the protected children
 */

import { useAuth0 } from '@auth0/auth0-react';
import { Center, Spinner, VStack, Text, Box } from '@chakra-ui/react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    // State 1: Still checking authentication status with Auth0
    if (isLoading) {
        return (
            <Center h="100vh" bg="surface.bg">
                <VStack spacing={4}>
                    <Box bg="brand.500" w={20} h={20} borderRadius="2xl" display="flex" alignItems="center" justifyContent="center">
                        <Text color="white" fontWeight="bold" fontSize="4xl">B</Text>
                    </Box>
                    <Spinner size="xl" color="brand.500" thickness="4px" />
                    <Text color="gray.600" fontSize="lg">Loading BookKeeper...</Text>
                </VStack>
            </Center>
        );
    }

    // State 2: Not authenticated - redirect to Auth0 login page
    if (!isAuthenticated) {
        loginWithRedirect();
        return (
            <Center h="100vh" bg="surface.bg">
                <VStack spacing={4}>
                    <Box bg="brand.500" w={20} h={20} borderRadius="2xl" display="flex" alignItems="center" justifyContent="center">
                        <Text color="white" fontWeight="bold" fontSize="4xl">B</Text>
                    </Box>
                    <Spinner size="xl" color="brand.500" thickness="4px" />
                    <Text color="gray.600" fontSize="lg">Redirecting to login...</Text>
                </VStack>
            </Center>
        );
    }

    // State 3: Authenticated - render the protected content
    return <>{children}</>;
};

export default ProtectedRoute;
