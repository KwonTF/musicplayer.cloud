import React from 'react';
import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const PlayerBlock = styled(Box)({
  position: 'absolute',
  bottom: 0,
});

const Player = () => <PlayerBlock>Player</PlayerBlock>;

export default Player;
