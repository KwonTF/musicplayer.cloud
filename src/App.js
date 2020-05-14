import React from 'react';
import Header from './components/Header';
import Player from './components/Player';
import MusicViewer from './components/MusicViewer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MusicViewer />
      <Player />
    </div>
  );
}

export default App;
