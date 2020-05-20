/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  position: absolute;
  padding-left: 1%;
  padding-right: 1%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Responsive = ({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
);

export default Responsive;
