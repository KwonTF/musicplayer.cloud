import React from 'react';
import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import MusicCard from './MusicCard';

const MusicViewerBlock = styled(Box)({
  display: 'inline-flex',
  alignItems: 'flex-start',
});

const MusicViewer = () => {
  const { musics } = useSelector(({ music }) => ({
    musics: music.musics,
  }));

  return (
    <MusicViewerBlock>
      {musics ? (
        musics.map((music) => (
          <div key={music.musicId}>
            <MusicCard music={music} />
          </div>
        ))
      ) : (
        <p>No Musics</p>
      )}
    </MusicViewerBlock>
  );
};

export default MusicViewer;
