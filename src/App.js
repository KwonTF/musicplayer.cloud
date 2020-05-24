import React from 'react';
import { Route } from 'react-router-dom';
import { styled, Box } from '@material-ui/core';
import './App.css';
import Artist from './pages/Artist';
import Login from './pages/Login';
import PlayList from './pages/PlayList';
import Album from './pages/Album';
import Index from './pages/Index';
import Header from './common/Header';
import Player from './common/Player';

const ContentBlock = styled(Box)({
  height: '100%',
  overflowY: 'scroll',
  paddingLeft: '1%',
  paddingRight: '1%',
});

function App() {
  return (
    <div className="App">
      <Header />
      <ContentBlock>
        <Route component={Index} path="/" exact />
        <Route component={Artist} path="/artist" />
        <Route component={Login} path="/login" />
        <Route component={PlayList} path="/playlist" />
        <Route component={Album} path="/album" />
      </ContentBlock>
      <Player />
    </div>
  );
}

export default App;
