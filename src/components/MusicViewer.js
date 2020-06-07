import React from 'react';
import { styled } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

const SortedText = styled(Typography)({
  fontWeight: '400',
  fontSize: '2rem',
});

const MusicViewerBlock = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  borderTop: 'solid #222222 1px',
  flexDirection: 'column',
});

const MusicCards = styled(Box)({
  display: 'inline-flex',
  alignItems: 'flex-start',
});

const MusicViewer = ({ musics, title }) => {
  return (
    <MusicViewerBlock>
      {title ? <SortedText>{title}</SortedText> : <></>}
      <MusicCards>
        {musics ? (
          musics.map((music) => (
            <div key={music.musicId}>
              <MusicCard music={music} />
            </div>
          ))
        ) : (
          <p>No Musics</p>
        )}
      </MusicCards>
    </MusicViewerBlock>
  );
};
MusicViewer.defaultProps = {
  title: '',
  musics: [],
};
MusicViewer.propTypes = {
  title: PropTypes.string,
  musics: PropTypes.arrayOf(
    PropTypes.shape({
      musicId: PropTypes.string,
      title: PropTypes.string,
      artist: PropTypes.string,
      album: PropTypes.string,
      imageLink: PropTypes.string,
      audioLink: PropTypes.string,
    }),
  ),
};
export default MusicViewer;
