import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import MusicViewer from '../components/MusicViewer';
import groupBy from '../utils/functions';

const SortedBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const Artist = () => {
  const [sortedMusic, setSortedMusic] = useState();
  const { musics } = useSelector(({ music }) => ({
    musics: music.musics,
  }));

  useEffect(() => {
    setSortedMusic(groupBy(musics, 'artist'));
  }, [musics, setSortedMusic]);

  return (
    <>
      {sortedMusic ? (
        <SortedBox>
          {Object.entries(sortedMusic).map(([key, value]) => (
            <MusicViewer key={key} title={key} musics={value} />
          ))}
        </SortedBox>
      ) : (
        <>No Music!</>
      )}
    </>
  );
};

export default Artist;
