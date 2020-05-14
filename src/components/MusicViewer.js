import React from 'react';
import styled from 'styled-components';

const MusicViewerBlock = styled.div`
  margin-top: 8vh;
  width: 100%;
  height: 92%;
  overflow-y: scroll;
`;

const TestBlock = styled.div`
  height: 1500px;
  width: 100%;
  background-color: aquamarine;
`;
const MusicViewer = () => (
  <MusicViewerBlock>
    MusicViewerBlock
    <TestBlock>Content</TestBlock>
  </MusicViewerBlock>
);

export default MusicViewer;
