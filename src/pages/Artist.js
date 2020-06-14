import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Paper,
  LinearProgress,
  Typography,
  Grid,
  Box,
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';

import { musicUploaded } from '../utils/music';

const ARTIST_QUERY = gql`
  {
    artists {
      name
      albums {
        albumId
        artist
        cover
        title
      }
    }
  }
`;

const Artist = () => {
  const dispatch = useDispatch();
  const { isMusicUploaded } = useSelector(({ music }) => ({
    isMusicUploaded: music.uploaded,
  }));
  const { loading, data, refetch } = useQuery(ARTIST_QUERY);
  if (isMusicUploaded) {
    refetch();
    dispatch(musicUploaded());
  }

  if (loading) return <LinearProgress />;

  if (!data) return 'No Music';

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
