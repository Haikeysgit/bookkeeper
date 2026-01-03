/**
 * Authorized Apollo Provider - GraphQL Client with Auth0 Integration
 * 
 * This component creates an Apollo Client that automatically attaches
 * Auth0 access tokens to all GraphQL requests. This ensures the backend
 * can verify the user's identity on every API call.
 */

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useMemo } from 'react';

export const AuthorizedApolloProvider = ({ children }: { children: React.ReactNode }) => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    // Create Apollo Client with authentication - memoized to avoid recreating on every render
    const client = useMemo(() => {
        // HTTP connection to the GraphQL API (uses env variable for deployment flexibility)
        const httpLink = createHttpLink({
            uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
        });

        // Middleware that adds the Auth0 token to request headers
        const authLink = setContext(async (_, { headers }) => {
            // Skip token if user isn't authenticated
            if (!isAuthenticated) return { headers };

            try {
                // Retrieve the access token from Auth0
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    }
                });

                // Attach token as Bearer authorization header
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : '',
                    },
                };
            } catch (error) {
                console.error("Error getting access token", error);
                return { headers };
            }
        });

        // Create and configure the Apollo Client
        return new ApolloClient({
            link: authLink.concat(httpLink),  // Chain auth middleware with HTTP link
            cache: new InMemoryCache(),        // Client-side caching
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only'  // Always fetch fresh data
                }
            }
        });
    }, [getAccessTokenSilently, isAuthenticated]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
