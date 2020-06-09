import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { addMusic, playPauseMusic } from '../utils/player';
import { setTrack, openTrack } from '../utils/editor';

const MusicBlock = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  position: 'static',
  width: '200px',
  height: '245px',
  marginRight: '1em',
  marginTop: '1em',
});

const ActionArea = styled(CardActionArea)({
  display: 'flex',
  flexDirection: 'column',
});

const CardActionButton = styled(IconButton)({
  position: 'absolute',
  zIndex: '1',
  alignSelf: 'flex-end',
  padding: 0,
  backgroundColor: '#FFFFFF44',
  justifyContent: 'center',
  '&:hover': {
    background: '#EEEEEE',
  },
});

const MusicNameArea = styled(CardContent)({
  display: 'flex',
  padding: 0,
  height: 45,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const MusicCard = ({ music }) => {
  const dispatch = useDispatch();
  const { nowPlaying } = useSelector(({ player }) => ({
    nowPlaying: player.nowPlaying,
  }));

  const MusicAdd = useCallback(() => {
    if (nowPlaying) {
      dispatch(addMusic(music));
    } else {
      dispatch(addMusic(music));
      dispatch(playPauseMusic());
    }
  }, [dispatch, music, nowPlaying]);

  const showDetail = useCallback(() => {
    console.log('Houseplan');
    dispatch(setTrack(music.title, music.artist, 1, music.imageLink));
    dispatch(openTrack());
  }, [dispatch, music]);

  return (
    <MusicBlock>
      <CardActionButton onClick={showDetail}>
        <AddCircleOutlineIcon />
      </CardActionButton>
      <ActionArea onClick={MusicAdd}>
        <CardMedia
          component="img"
          image={
            music.imageLink
              ? music.imageLink
              : 'https://miel.dev/kwontf/dame.png'
          }
          alt={music.title}
          title={music.title}
          height={200}
          style={{ width: 200 }}
        />
        <MusicNameArea>
          <Typography>{music.title}</Typography>
        </MusicNameArea>
      </ActionArea>
    </MusicBlock>
  );
};

MusicCard.propTypes = {
  music: PropTypes.shape({
    musicId: PropTypes.string.isRequired,
    title: PropTypes.string,
    artist: PropTypes.string,
    album: PropTypes.string,
    imageLink: PropTypes.string,
    audioLink: PropTypes.string,
  }),
};

MusicCard.defaultProps = {
  music: {
    title: '',
    artist: '',
    album: '',
    imageLink: 'https://miel.dev/kwontf/dame.png',
    audioLink: '',
  },
};
export default MusicCard;
