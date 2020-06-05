import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import API from '../utils/api';
import { useAuth0 } from '../utils/auth0';

const AuthorizedApolloProvider = ({ children }) => {
  const { getTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState('');
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const aToken = await getTokenSilently();
        if (process.env.NODE_ENV === 'development') {
          console.table({ token: aToken });
        }
        setToken(aToken);
      } else {
        setToken('');
      }
    };
    getToken();
  }, [isAuthenticated, getTokenSilently]);

  const cache = new InMemoryCache();
  const httpLink = new HttpLink({
    uri: `${API.endpoint}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

AuthorizedApolloProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthorizedApolloProvider;
