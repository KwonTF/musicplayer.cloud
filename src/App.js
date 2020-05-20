import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ArtistPage from './pages/ArtistPage';
import LoginPage from './pages/LoginPage';
import PlayListPage from './pages/PlayListPage';
import AlbumPage from './pages/AlbumPage';
import MusicPage from './pages/MusicPage';

function App() {
  return (
    <div className="App">
      <Route component={MusicPage} path="/" exact />
      <Route component={ArtistPage} path="/artist" />
      <Route component={LoginPage} path="/login" />
      <Route component={PlayListPage} path="/playlist" />
      <Route component={AlbumPage} path="/album" />
    </div>
  );
}

export default App;
