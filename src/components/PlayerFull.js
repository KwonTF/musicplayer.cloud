import React from 'react';
import { styled } from '@material-ui/styles';
import { Backdrop, Box, Typography, CardMedia } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PlayerButtons from './PlayerButtons';

const PlayerBackDrop = styled(Backdrop)({
  color: '#FFFFFF',
  textShadow: '#000000 2px 2px 2px',
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
});

const SubText = styled(Typography)({
  fontSize: '1.5rem',
  fontFamily: 'Lato',
  fontWeight: '700',
  color: '#EEEEEE',
});

const ListBox = styled(Box)({
  width: '50%',
  border: 'solid #EEEEEE 1px',
  borderRadius: '5px',
  marginTop: '1em',
  paddingLeft: '1em',
});

const imageLink =
  'https://w.namu.la/s/2b00f887323e43bff3a8fc205696d6ea47b635a8b311988ebbd959ebb19491ee33a4cbd966724fb008bce7b1d0df861a9bc9047c4564d0833ff68e7225bed47904299de824e55070a009c101ab6abb6f539c49bf1afbd21937cb607388a5fc3d';

const PlayerFull = () => {
  const { open, playList } = useSelector(({ player }) => ({
    open: player.open,
    playList: player.playList,
  }));
  console.log(playList);
  return (
    <PlayerBackDrop open={open} style={{ flexDirection: 'column' }}>
      <Box style={{ display: 'flex' }}>
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
            <PlayerButtons />
          </Box>
        </InfoBox>
      </Box>
      {playList
        ? playList.map((music, index) => {
            return (
              <ListBox key={index + music.musicId}>
                <Typography>
                  {music.title}-{music.artist}
                </Typography>
              </ListBox>
            );
          })
        : null}
    </PlayerBackDrop>
  );
};

export default PlayerFull;
