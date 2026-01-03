import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider } from '@auth0/auth0-react'
import { AuthorizedApolloProvider } from './components/AuthorizedApolloProvider'
import { FrontendErrorBoundary } from './components/FrontendErrorBoundary'
import App from './App'
import theme from './theme'

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FrontendErrorBoundary>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: audience,
          scope: 'openid profile email'
        }}
      >
        <AuthorizedApolloProvider>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </AuthorizedApolloProvider>
      </Auth0Provider>
    </FrontendErrorBoundary>
  </React.StrictMode>,
)
