import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Artist from './pages/Artist';
import Login from './pages/Login';
import PlayList from './pages/PlayList';
import Album from './pages/Album';
import Index from './pages/Index';

function App() {
  return (
    <div className="App">
      <Route component={Index} path="/" exact />
      <Route component={Artist} path="/artist" />
      <Route component={Login} path="/login" />
      <Route component={PlayList} path="/playlist" />
      <Route component={Album} path="/album" />
    </div>
  );
}

export default App;
