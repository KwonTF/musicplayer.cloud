import React, { useEffect } from 'react';
import { styled } from '@material-ui/styles';
import { AppBar, Toolbar, CardMedia, Typography, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import PlayerButtons from './PlayerButtons';
import PlayerFull from './PlayerFull';
import { skipMusic, playPauseMusic } from '../utils/player';

const PlayerBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
  backgroundColor: 'transparent',
});

const PlayerBarBlock = styled(Toolbar)({
  backgroundColor: '#24000ABB',
  backdropFilter: 'blur(5px)',
});

const MusicNameText = styled(Typography)({
  paddingLeft: '2em',
  fontFamily: 'Lato',
  fontWeight: '900',
  textShadow: '#000000 2px 2px 2px',
});

const Player = () => {
  const dispatch = useDispatch();
  const { open, nowPlaying, audio } = useSelector(({ player }) => ({
    open: player.open,
    playList: player.playList,
    nowPlaying: player.nowPlaying,
    audio: player.audio,
  }));

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => {
        dispatch(skipMusic());
        dispatch(playPauseMusic());
      });
    }
  }, [dispatch, audio]);

  if (nowPlaying) {
    return (
      <>
        {open ? (
          <PlayerFull />
        ) : (
          <PlayerBar>
            <PlayerBarBlock>
              <Box
                flexGrow={1}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <CardMedia
                  component="img"
                  image={nowPlaying.imageLink}
                  alt={nowPlaying.title}
                  title={nowPlaying.title}
                  height={50}
                  style={{ width: 50 }}
                />
                <MusicNameText>
                  {nowPlaying.title ? nowPlaying.title : 'No Title'}
                </MusicNameText>
              </Box>
              <PlayerButtons />
            </PlayerBarBlock>
          </PlayerBar>
        )}
      </>
    );
  }

  return null;
};

export default Player;
