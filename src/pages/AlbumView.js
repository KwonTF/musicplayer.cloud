import React, { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, Redirect } from 'react-router-dom';
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
import {
  ALBUM_QUERY,
  REMOVE_ALBUM,
  ALBUMS_QUERY,
  TRACKS_QUERY,
  ARTISTS_QUERY,
} from '../utils/query';

const Album = () => {
  const dispatch = useDispatch();

  const { nowPlaying } = useSelector(({ player }) => ({
    nowPlaying: player.nowPlaying,
  }));
  const { albumId } = useParams();
  const { loading, data, error } = useQuery(ALBUM_QUERY, {
    variables: {
      albumId: parseInt(albumId, 10),
    },
  });
  const [removeAlbum] = useMutation(REMOVE_ALBUM);

  const AddMusic = useCallback(
    (music) => {
      dispatch(addMusic(music));
      if (!nowPlaying) {
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
          track.trackId,
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
  if (!album) return <Redirect to="/Album" />;
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
                  dispatch(
                    addMusic({
                      trackId: track.trackId,
                      title: track.title,
                      artist: track.artist,
                      album: album.title,
                      imageLink: album.cover,
                      audioLink: track.url,
                      track: track.trackNumber,
                      albumArtist: album.artist,
                      albumId: album.albumId,
                    }),
                  );
                });
                if (!nowPlaying) {
                  dispatch(playPauseMusic());
                }
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
                    refetchQueries: [
                      {
                        query: ALBUMS_QUERY,
                      },
                      {
                        query: TRACKS_QUERY,
                      },
                      {
                        query: ARTISTS_QUERY,
                      },
                      {
                        query: ALBUM_QUERY,
                        variables: {
                          albumId: parseInt(album.albumId, 10),
                        },
                      },
                    ],
                  });
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
                        trackId: track.trackId,
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
                        trackId: track.trackId,
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
