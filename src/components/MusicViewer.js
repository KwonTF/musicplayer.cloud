import React from 'react';
import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import MusicCard from './MusicCard';

const MusicViewerBlock = styled(Box)({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const MusicViewer = () => {
  const imageLink =
    'https://w.namu.la/s/78324f93b5e26fdf201d9fff41b58577f046bda4a980f1d58be514b2d47cb8ba6aba38d47e09e98392ccd00e07483a747314135a0dfee8fd100106d0b2867943555c7d8cb90e72fe3f6f3544af21ae6931fb62f4acfe29990871d8a9a48c76310ae2585572bf66e3975081471e356843';
  const musicLink = 'MikiNano!';
  return (
    <MusicViewerBlock>
      <p>MusicViewerBlock</p>
      <MusicCard imageLink={imageLink} musicLink={musicLink} />
    </MusicViewerBlock>
  );
};

export default MusicViewer;
