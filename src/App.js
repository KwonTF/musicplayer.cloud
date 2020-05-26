import React from 'react';
import { styled, Container, Box } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import Artist from './pages/Artist';
import Login from './pages/Login';
import PlayList from './pages/PlayList';
import Album from './pages/Album';
import Index from './pages/Index';
import Header from './components/Header';
import Player from './components/Player';
import Upload from './pages/Upload';

const ContentBlock = styled(Container)({
  height: '100%',
  overflowY: 'scroll',
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

function App() {
  return (
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
  );
}

export default App;
