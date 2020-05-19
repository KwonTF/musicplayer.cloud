import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Player from './components/Player';
import './App.css';
import MusicViewer from './components/MusicViewer';
import ArtistPage from './pages/ArtistPage';
import LoginPage from './pages/LoginPage';
import PlayListPage from './pages/PlayListPage';
import AlbumPage from './pages/AlbumPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Route component={MusicViewer} path="/" exact />
      <Route component={ArtistPage} path="/artist" />
      <Route component={LoginPage} path="/login" />
      <Route component={PlayListPage} path="/playlist" />
      <Route component={AlbumPage} path="/album" />
      <Player />
    </div>
  );
}

export default App;
