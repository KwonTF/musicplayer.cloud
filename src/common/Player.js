import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';

const PlayerBlock = styled(Responsive)`
  position: absolute;
  bottom: 0;
`;
const Player = () => <PlayerBlock>Player</PlayerBlock>;

export default Player;
