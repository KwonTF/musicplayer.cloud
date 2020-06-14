import React from 'react';
import { Container, LinearProgress } from '@material-ui/core';
import { Router, Switch, Route } from 'react-router-dom';

import Artist from './pages/Artist';
import Track from './pages/Track';
import Album from './pages/Album';
import AlbumView from './pages/AlbumView';
import Index from './pages/Index';
import Upload from './pages/Upload';
import Page404 from './pages/Page404';

import Header from './components/Header';
import Player from './components/Player';
import ApolloProvider from './components/ApolloProvider';
import IndexRoute from './components/IndexRoute';
import PrivateRoute from './components/PrivateRoute';

import { useAuth0 } from './utils/auth0';
import history from './utils/history';
import Editor from './components/Editor';
import Footer from './components/Footer';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <ApolloProvider>
      <Router history={history}>
        <Header />
        <Container>
          <Switch>
            <IndexRoute component={Index} path="/" exact />
            <PrivateRoute component={Artist} path="/artist" />
            <PrivateRoute component={Track} path="/track" />
            <PrivateRoute component={Album} path="/album" exact />
            <PrivateRoute component={AlbumView} path="/album/:albumId" />
            <PrivateRoute component={Upload} path="/upload" />
            <Route component={Page404} />
          </Switch>
        </Container>
        <Editor />
        <Player />
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
