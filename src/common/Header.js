import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';

const HeaderBlock = styled(Responsive)`
  display: flex;
  position: absolute;
  height: 8%;
  width: 100vw;
  background-color: #b4e04b;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeftArea = styled.div``;
const HeaderRightArea = styled.div``;

const Header = () => (
  <HeaderBlock>
    <HeaderLeftArea>Left</HeaderLeftArea>
    <HeaderRightArea>Right</HeaderRightArea>
  </HeaderBlock>
);

export default Header;
