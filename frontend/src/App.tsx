/**
 * App Component - Root Application Layout
 * 
 * Renders the main application structure:
 * - Header with user info and navigation
 * - BookList as the main content area
 * - Protected by authentication wrapper
 */

import { Box, Container } from '@chakra-ui/react';
import Header from './components/Header';
import BookList from './components/BookList';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useAuth0();

  return (
    <ProtectedRoute>
      <Box minH="100vh" bg="surface.bg">
        <Header userName={user?.name || user?.email || 'User'} />
        <Container maxW="container.xl" py={10}>
          <BookList />
        </Container>
      </Box>
    </ProtectedRoute>
  );
}

export default App;
