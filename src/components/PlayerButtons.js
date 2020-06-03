import React, { useCallback } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import EjectIcon from '@material-ui/icons/Eject';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { IconButton } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  playPauseMusic,
  skipMusic,
  changeOpen,
  setMusic,
} from '../utils/player';

const IconStyle = styled(IconButton)({
  color: '#FFFFFF',
});

const PlayerButtons = () => {
  const dispatch = useDispatch();
  const { playing, open } = useSelector(({ player }) => ({
    playing: player.playing,
    open: player.open,
  }));

  const PlayPauseMusic = useCallback(() => {
    dispatch(playPauseMusic());
  }, [dispatch]);

  const SkipMusic = useCallback(() => {
    dispatch(skipMusic());
    dispatch(
      setMusic(
        'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
      ),
    );
  }, [dispatch]);

  const ChangeBackDrop = useCallback(() => {
    dispatch(changeOpen());
  }, [dispatch]);

  return (
    <>
      {playing ? (
        <IconStyle onClick={PlayPauseMusic}>
          <PauseIcon />
        </IconStyle>
      ) : (
        <IconStyle onClick={PlayPauseMusic}>
          <PlayArrowIcon />
        </IconStyle>
      )}
      <IconStyle onClick={SkipMusic}>
        <SkipNextIcon />
      </IconStyle>
      <IconStyle onClick={ChangeBackDrop}>
        {open ? <KeyboardArrowDownIcon /> : <EjectIcon />}
      </IconStyle>
    </>
  );
};

export default PlayerButtons;
