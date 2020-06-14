import React, { useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  LinearProgress,
  Box,
} from '@material-ui/core';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { addMusic, playPauseMusic } from '../utils/player';
import { setTrack, openTrack } from '../utils/editor';
import { TRACKS_QUERY } from '../utils/query';

const Track = () => {
  const { loading, data } = useQuery(TRACKS_QUERY);
  const dispatch = useDispatch();
  const { nowPlaying } = useSelector(({ player }) => ({
    nowPlaying: player.nowPlaying,
  }));
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

  const rows = data.tracks || [];

  return (
    <div>
      <Helmet>
        <title>Track :: MusicPlayer.Cloud</title>
      </Helmet>
      <Box m={2} />
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Artist</TableCell>
              <TableCell align="right">Album</TableCell>
              <TableCell align="right">#</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell>Music does not exist</TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow key={row.trackId}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.artist}</TableCell>
                <TableCell align="right">{row.album}</TableCell>
                <TableCell align="right">{row.trackNumber}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="add to queue"
                    onClick={() => {
                      const track = {
                        trackId: row.trackId,
                        title: row.title,
                        artist: row.artist,
                        album: row.album,
                        imageLink: row.cover,
                        audioLink: row.url,
                        track: row.trackNumber,
                        albumArtist: row.albumArtist,
                        albumId: row.albumId,
                      };
                      AddMusic(track);
                    }}
                  >
                    <QueueMusicIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      const track = {
                        trackId: row.trackId,
                        title: row.title,
                        artist: row.artist,
                        album: row.album,
                        imageLink: row.cover,
                        audioLink: row.url,
                        track: row.trackNumber,
                        albumArtist: row.albumArtist,
                        albumId: row.albumId,
                      };
                      ShowDetail(track);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Track;
