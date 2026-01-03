import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useMemo } from 'react';

export const AuthorizedApolloProvider = ({ children }: { children: React.ReactNode }) => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const client = useMemo(() => {
        const httpLink = createHttpLink({
            uri: 'http://localhost:3000/graphql', // Backend GraphQL endpoint
        });

        const authLink = setContext(async (_, { headers }) => {
            if (!isAuthenticated) return { headers };

            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    }
                });

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

        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only' // Ensure we always get fresh data for this demo
                }
            }
        });
    }, [getAccessTokenSilently, isAuthenticated]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
