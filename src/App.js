import React from 'react';
import { styled, Container, Box } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import Artist from './pages/Artist';
import Login from './pages/Login';
import PlayList from './pages/PlayList';
import Album from './pages/Album';
import Index from './pages/Index';
import Upload from './pages/Upload';

import Header from './components/Header';
import Player from './components/Player';

const ContentBlock = styled(Container)({
  height: '100%',
  overflowY: 'auto',
  paddingLeft: '1%',
  paddingRight: '1%',
});

const AppStyle = {
  display: 'block',
  position: 'fixed',
  width: '100%',
  height: '100%',
  fontFamily: ['Lato', 'sans-serif'],
};

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: 'https://api.musicplayer.cloud/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('userId');
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Box className="App" style={AppStyle}>
          <Header />
          <ContentBlock>
            <Route component={Index} path="/" exact />
            <Route component={Artist} path="/artist" />
            <Route component={Login} path="/login" />
            <Route component={PlayList} path="/playlist" />
            <Route component={Album} path="/album" />
            <Route component={Upload} path="/upload" />
          </ContentBlock>
          <Player />
        </Box>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
