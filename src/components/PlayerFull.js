import React from 'react';
import { styled } from '@material-ui/styles';
import { Backdrop, Box, Typography, Grid, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PlayerButtons from './PlayerButtons';
import MusicListItem from './MusicListItem';

const PlayerBackDrop = styled(Backdrop)({
  color: '#FFFFFF',
  textShadow: '#000000 2px 2px 2px',
  backgroundColor: '#24000ABB',
  overflowY: 'auto',
  zIndex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: 'auto',
  paddingTop: '6em',
  backdropFilter: 'blur(5px)',
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

const PlayerFull = () => {
  const { open, playList, nowPlaying } = useSelector(({ player }) => ({
    open: player.open,
    playList: player.playList,
    nowPlaying: player.nowPlaying,
  }));
  return (
    <PlayerBackDrop open={open}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
            <img
              src={nowPlaying.imageLink}
              alt={nowPlaying.title}
              title={nowPlaying.title}
              width="320px"
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
            <InfoBox>
              <TitleText>
                {nowPlaying.title ? nowPlaying.title : 'No Title'}
              </TitleText>
              <SubText>
                {nowPlaying.artist ? nowPlaying.artist : 'No Artist'}
              </SubText>
              <SubText>
                {nowPlaying.album ? nowPlaying.album : 'No Album'}
              </SubText>
              <Box>
                <PlayerButtons />
              </Box>
            </InfoBox>
            {playList &&
              playList.map((music, index) => (
                <MusicListItem music={music} index={index} />
              ))}
          </Grid>
        </Grid>
      </Container>
    </PlayerBackDrop>
  );
};

export default PlayerFull;
