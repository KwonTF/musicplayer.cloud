import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  LinearProgress,
  Grid,
  Typography,
  Paper,
  Box,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { musicUploaded } from '../utils/music';

const ALBUM_QUERY = gql`
  {
    albums {
      albumId
      title
      artist
      cover
    }
  }
`;

const Album = () => {
  const dispatch = useDispatch();
  const { isMusicUploaded } = useSelector(({ music }) => ({
    isMusicUploaded: music.uploaded,
  }));
  const { loading, data, refetch } = useQuery(ALBUM_QUERY);
  if (isMusicUploaded) {
    refetch();
    dispatch(musicUploaded());
  }

  if (loading) return <LinearProgress />;

  const albums = data.albums || [];

  return (
    <>
      <Helmet>
        <title>Album :: MusicPlayer.Cloud</title>
      </Helmet>
      <Box m={2} />
      {albums.length === 0 && <Typography>Music does not exist.</Typography>}
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item xs={6} md={4} lg={3} key={album.albumId}>
            <Link
              to={`/album/${album.albumId}`}
              style={{ textDecoration: 'none' }}
            >
              <Paper>
                <img src={album.cover} alt={album.title} width="100%" />
                <div style={{ padding: '0 16px' }}>
                  <Typography component="h6" variant="h6" noWrap>
                    {album.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" noWrap>
                    {album.artist}
                  </Typography>
                </div>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Album;
