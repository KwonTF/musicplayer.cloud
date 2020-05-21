import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';

const ContentBlock = styled(Responsive)`
  margin-top: 8vh;
  width: 100%;
  height: 92%;
  overflow-y: scroll;
`;
// eslint-disable-next-line react/prop-types
const Content = ({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ContentBlock {...rest}>{children}</ContentBlock>
);

export default Content;
