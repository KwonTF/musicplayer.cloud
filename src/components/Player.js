import React, { useCallback, useState } from 'react';
import { styled } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Backdrop,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import EjectIcon from '@material-ui/icons/Eject';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
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

const PlayerBackDrop = styled(Backdrop)({
  color: '#FFFFFF',
  backgroundColor: '#18206BBB',
  zIndex: 1,
});

const InfoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '320px',
  paddingLeft: '1em',
});

const TitleText = styled(Typography)({
  fontSize: '2.5rem',
  fontFamily: 'Lato',
  fontWeight: '900',
  textShadow: '#000000 2px 2px 2px',
});

const SubText = styled(Typography)({
  fontSize: '1.5rem',
  fontFamily: 'Lato',
  fontWeight: '700',
  color: '#EEEEEE',
  textShadow: '#000000 2px 2px 2px',
});

const imageLink =
  'https://w.namu.la/s/2b00f887323e43bff3a8fc205696d6ea47b635a8b311988ebbd959ebb19491ee33a4cbd966724fb008bce7b1d0df861a9bc9047c4564d0833ff68e7225bed47904299de824e55070a009c101ab6abb6f539c49bf1afbd21937cb607388a5fc3d';
const Player = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { playing } = useSelector(({ player }) => ({
    playing: player.playing,
  }));

  const PlayMusic = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);

  const PauseMusic = useCallback(() => {
    dispatch(pauseMusic());
  }, [dispatch]);

  const ChangeBackDrop = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      {open ? (
        <PlayerBackDrop open={open}>
          <CardMedia
            component="img"
            image={imageLink}
            alt="Contemplative Reptile"
            title="MusicName"
            height={320}
            style={{ width: 320 }}
          />
          <InfoBox>
            <TitleText>Music Name</TitleText>
            <SubText>Artitst Name</SubText>
            <SubText>Album Name</SubText>
            <Box>
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
              <IconStyle onClick={ChangeBackDrop}>
                <KeyboardArrowDownIcon />
              </IconStyle>
            </Box>
          </InfoBox>
        </PlayerBackDrop>
      ) : (
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
            <IconStyle onClick={ChangeBackDrop}>
              <EjectIcon />
            </IconStyle>
          </PlayerBarBlock>
        </PlayerBar>
      )}
    </>
  );
};

export default Player;
