/**
 * Application Entry Point
 * 
 * Sets up the React application with all required providers:
 * - Auth0Provider: Handles user authentication
 * - AuthorizedApolloProvider: GraphQL client with auth tokens
 * - ChakraProvider: UI component library with custom theme
 * - FrontendErrorBoundary: Graceful error handling
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider } from '@auth0/auth0-react'
import { AuthorizedApolloProvider } from './components/AuthorizedApolloProvider'
import { FrontendErrorBoundary } from './components/FrontendErrorBoundary'
import App from './App'
import theme from './theme'

// Auth0 configuration from environment variables
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Error boundary catches and displays React errors gracefully */}
    <FrontendErrorBoundary>
      {/* Auth0 handles login/logout and provides user context */}
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,  // Return here after login
          audience: audience,                     // API identifier for access tokens
          scope: 'openid profile email'          // Request user info
        }}
        cacheLocation="localstorage"              // Persist tokens across page refreshes
        useRefreshTokens={true}                   // Use refresh tokens for silent renewal
        useRefreshTokensFallback={true}           // Fallback to iframe if refresh tokens fail
      >
        {/* Apollo provides GraphQL client with auth tokens attached */}
        <AuthorizedApolloProvider>
          {/* Chakra provides styled UI components */}
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </AuthorizedApolloProvider>
      </Auth0Provider>
    </FrontendErrorBoundary>
  </React.StrictMode>,
)
