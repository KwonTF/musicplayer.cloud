import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Artist from './pages/Artist';
import Login from './pages/Login';
import PlayList from './pages/PlayList';
import Album from './pages/Album';
import Index from './pages/Index';
import Header from './common/Header';
import Player from './common/Player';
import Content from './common/Content';

function App() {
  return (
    <div className="App">
      <Header />
      <Content>
        <Route component={Index} path="/" exact />
        <Route component={Artist} path="/artist" />
        <Route component={Login} path="/login" />
        <Route component={PlayList} path="/playlist" />
        <Route component={Album} path="/album" />
      </Content>
      <Player />
    </div>
  );
}

export default App;
