import React from 'react';
import { styled } from '@material-ui/styles';
import { AppBar, Toolbar, CardMedia, Typography, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PlayerButtons from './PlayerButtons';
import PlayerFull from './PlayerFull';

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

const imageLink =
  'https://w.namu.la/s/2b00f887323e43bff3a8fc205696d6ea47b635a8b311988ebbd959ebb19491ee33a4cbd966724fb008bce7b1d0df861a9bc9047c4564d0833ff68e7225bed47904299de824e55070a009c101ab6abb6f539c49bf1afbd21937cb607388a5fc3d';

const Player = () => {
  const { open } = useSelector(({ player }) => ({
    open: player.open,
  }));

  return (
    <>
      {open ? (
        <PlayerFull />
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
            <PlayerButtons />
          </PlayerBarBlock>
        </PlayerBar>
      )}
    </>
  );
};

export default Player;
