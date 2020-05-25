import React from 'react';
import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const MusicViewerBlock = styled(Box)({});

const TestBlock = styled(Box)({
  height: '1500px',
  width: '100%',
  backgroundColor: 'aquamarine',
});

const MusicViewer = () => (
  <MusicViewerBlock>
    MusicViewerBlock
    <TestBlock>Content</TestBlock>
  </MusicViewerBlock>
);

export default MusicViewer;
