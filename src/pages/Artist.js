import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  LinearProgress,
  Typography,
  Grid,
  Box,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';

import { ARTISTS_QUERY } from '../utils/query';

const Artist = () => {
  const { loading, data } = useQuery(ARTISTS_QUERY);
  if (loading) return <LinearProgress />;

  const { artists } = data;
  return (
    <>
      <Helmet>
        <title>Artist :: MusicPlayer.Cloud</title>
      </Helmet>
      <Box m={2} />
      {artists.length === 0 && <Typography>Music does not exist.</Typography>}
      {artists.map((artist) => (
        <div key={artist.name}>
          <Typography component="h4" variant="h4">
            {artist.name}
          </Typography>
          <Box m={2} />
          <Grid container spacing={3}>
            {artist.albums.map((album) => (
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
                    </div>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box m={4} />
        </div>
      ))}
    </>
  );
};

export default Artist;
