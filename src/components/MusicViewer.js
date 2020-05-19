import React from 'react';
import styled from 'styled-components';
import Content from '../common/Content';

const MusicViewerBlock = styled(Content)``;

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
