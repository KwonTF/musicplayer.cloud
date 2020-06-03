import React from 'react';
import { styled } from '@material-ui/styles';
import { Backdrop, Box, Typography, CardMedia } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PlayerButtons from './PlayerButtons';
import MusicListItem from './MusicListItem';

const PlayerBackDrop = styled(Backdrop)({
  color: '#FFFFFF',
  textShadow: '#000000 2px 2px 2px',
  backgroundColor: '#18206BBB',
  overflowY: 'auto',
  zIndex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: 'auto',
  paddingTop: '6em',
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
      <Box style={{ display: 'flex' }}>
        <CardMedia
          component="img"
          image={
            nowPlaying.imageLink
              ? nowPlaying.imageLink
              : 'https://miel.dev/kwontf/dame.png'
          }
          alt={nowPlaying.title}
          title={nowPlaying.title}
          height={320}
          style={{ width: 320 }}
        />
        <InfoBox>
          <TitleText>
            {nowPlaying.title ? nowPlaying.title : 'No Title'}
          </TitleText>
          <SubText>
            {nowPlaying.artist ? nowPlaying.artist : 'No Artist'}
          </SubText>
          <SubText>{nowPlaying.album ? nowPlaying.album : 'No Album'}</SubText>
          <Box>
            <PlayerButtons />
          </Box>
        </InfoBox>
      </Box>
      {playList
        ? playList.map((music, index) => {
            return (
              <>
                <MusicListItem music={music} index={index} />
              </>
            );
          })
        : null}
    </PlayerBackDrop>
  );
};

export default PlayerFull;
