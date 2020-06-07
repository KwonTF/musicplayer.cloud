import React from 'react';
import { useSelector } from 'react-redux';
import MusicViewer from '../components/MusicViewer';

const Index = () => {
  const { musics } = useSelector(({ music }) => ({
    musics: music.musics,
  }));

  return (
    <>
      <MusicViewer musics={musics} />
    </>
  );
};

export default Index;
