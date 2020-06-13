import React, { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import {
  LinearProgress,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ButtonGroup,
  Button,
  Box,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import { addMusic, playPauseMusic } from '../utils/player';
import { setTrack, openTrack } from '../utils/editor';
import { musicUploaded } from '../utils/music';

const ALBUM_QUERY = gql`
  query getAlbum($AlbumId: Int!) {
    album(albumId: $AlbumId) {
      albumId
      title
      artist
      cover
      tracks {
        artist
        title
        trackId
        trackNumber
        url
      }
    }
  }
`;

const REMOVE_ALBUM = gql`
  mutation removingMutations($AlbumId: Int!) {
    removeAlbum(albumId: $AlbumId)
  }
`;

const Album = () => {
  const dispatch = useDispatch();
  const { isMusicUploaded } = useSelector(({ music }) => ({
    isMusicUploaded: music.uploaded,
  }));

  const { nowPlaying } = useSelector(({ player }) => ({
    nowPlaying: player.nowPlaying,
  }));
  const { albumId } = useParams();
  const { loading, data, error, refetch } = useQuery(ALBUM_QUERY, {
    variables: {
      AlbumId: parseInt(albumId, 10),
    },
  });
  const [removeAlbum] = useMutation(REMOVE_ALBUM);
  const history = useHistory();
  if (isMusicUploaded) {
    refetch();
    dispatch(musicUploaded());
  }
  const AddMusic = useCallback(
    (music) => {
      if (nowPlaying) {
        dispatch(addMusic(music));
      } else {
        dispatch(addMusic(music));
        dispatch(playPauseMusic());
      }
    },
    [dispatch, nowPlaying],
  );
  const ShowDetail = useCallback(
    (track) => {
      dispatch(
        setTrack(
          track.title,
          track.artist,
          track.track,
          track.imageLink,
          track.musicId,
          track.album,
          track.albumArtist,
          track.albumId,
        ),
      );
      dispatch(openTrack());
    },
    [dispatch],
  );
  if (loading) return <LinearProgress />;
  if (error) return <Redirect to="/404" />;
  const { album } = data;
  return (
    <>
      <Helmet>
        <title>{album.title} :: MusicPlayer.Cloud</title>
      </Helmet>
      <Box m={2} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={album.cover} alt={album.title} width="100%" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography component="h4" variant="h4">
            {album.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {album.artist}
          </Typography>
          <Box m={2} />
          <ButtonGroup
            color="secondary"
            aria-label="outlined secondary button group"
          >
            <Button
              startIcon={<QueueMusicIcon />}
              onClick={() => {
                album.tracks.forEach((track) => {
                  AddMusic({
                    musicId: track.trackId,
                    title: track.title,
                    artist: track.artist,
                    album: album.title,
                    imageLink: album.cover,
                    audioLink: track.url,
                    track: track.trackNumber,
                    albumArtist: album.artist,
                    albumId: album.albumId,
                  });
                });
              }}
            >
              Play Album
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={() => {
                // eslint-disable-next-line no-alert
                if (window.confirm(`${album.title} 앨범을 삭제하시겠습니까?`)) {
                  removeAlbum({
                    variables: {
                      AlbumId: album.albumId,
                    },
                  });
                  dispatch(musicUploaded());
                  history.push('/artist');
                }
              }}
            >
              Delete Album
            </Button>
          </ButtonGroup>
          <Box m={2} />
          <List>
            {album.tracks.map((track) => (
              <ListItem key={track.trackId}>
                <ListItemText
                  primary={track.title}
                  secondary={track.artist === album.artist ? '' : track.artist}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="add to queue"
                    onClick={() => {
                      AddMusic({
                        musicId: track.trackId,
                        title: track.title,
                        artist: track.artist,
                        album: album.title,
                        imageLink: album.cover,
                        audioLink: track.url,
                        track: track.trackNumber,
                        albumArtist: album.artist,
                        albumId: album.albumId,
                      });
                    }}
                  >
                    <QueueMusicIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    edge="end"
                    onClick={() => {
                      ShowDetail({
                        musicId: track.trackId,
                        title: track.title,
                        artist: track.artist,
                        album: album.title,
                        imageLink: album.cover,
                        audioLink: track.url,
                        track: track.trackNumber,
                        albumArtist: album.artist,
                        albumId: album.albumId,
                      });
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default Album;
