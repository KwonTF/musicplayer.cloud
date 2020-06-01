import React, { useCallback } from 'react';
import { styled } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import EjectIcon from '@material-ui/icons/Eject';
import { useDispatch, useSelector } from 'react-redux';
import { playMusic, pauseMusic } from '../modules/player';

const PlayerBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
  backgroundColor: 'transparent',
});

const PlayerBarBlock = styled(Toolbar)({
  backgroundColor: '#18206BBB',
});

const MusicNameText = styled(Typography)({
  paddingLeft: '2em',
  fontFamily: 'Lato',
  fontWeight: '900',
  textShadow: '#000000 2px 2px 2px',
});

const IconStyle = styled(IconButton)({
  color: '#FFFFFF',
});
const imageLink =
  'https://w.namu.la/s/2b00f887323e43bff3a8fc205696d6ea47b635a8b311988ebbd959ebb19491ee33a4cbd966724fb008bce7b1d0df861a9bc9047c4564d0833ff68e7225bed47904299de824e55070a009c101ab6abb6f539c49bf1afbd21937cb607388a5fc3d';
const Player = () => {
  const { playing } = useSelector(({ player }) => ({
    playing: player.playing,
  }));
  const dispatch = useDispatch();
  const PlayMusic = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);

  const PauseMusic = useCallback(() => {
    dispatch(pauseMusic());
  }, [dispatch]);

  return (
    <PlayerBar>
      <PlayerBarBlock>
        <Box flexGrow={1} style={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            component="img"
            image={imageLink}
            alt="Contemplative Reptile"
            title="MusicName"
            height={50}
            style={{ width: 50 }}
          />
          <MusicNameText>Music name</MusicNameText>
        </Box>
        {playing ? (
          <IconStyle onClick={PauseMusic}>
            <PauseIcon />
          </IconStyle>
        ) : (
          <IconStyle onClick={PlayMusic}>
            <PlayArrowIcon />
          </IconStyle>
        )}
        <IconStyle>
          <SkipNextIcon />
        </IconStyle>
        <IconStyle>
          <EjectIcon />
        </IconStyle>
      </PlayerBarBlock>
    </PlayerBar>
  );
};

export default Player;
