import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  styled,
  Box,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';

import API from '../utils/api';
import { useAuth0 } from '../utils/auth0';
import { ALBUMS_QUERY, TRACKS_QUERY, ARTISTS_QUERY } from '../utils/query';

const UploadGrid = styled(Grid)({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 64px)',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#BBBBBB',
});

const UploadBox = styled(Box)({
  display: 'flex',
  width: '20%',
  height: '20%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FEFEFE',
});

const Upload = ({ history }) => {
  const { getTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState('');

  const albumsQuery = useQuery(ALBUMS_QUERY);
  const artistsQuery = useQuery(ARTISTS_QUERY);
  const tracksQuery = useQuery(TRACKS_QUERY);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const aToken = await getTokenSilently();
        setToken(aToken);
      } else {
        setToken('');
      }
    };
    getToken();
  }, [isAuthenticated, getTokenSilently]);

  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setLoading(true);
      const uploads = acceptedFiles.map(
        (file) =>
          new Promise((accept, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${API.endpoint}/upload`);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            const formData = new FormData();
            formData.append('file', file);
            xhr.onreadystatechange = () => {
              if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                  accept(xhr.responseText);
                } else {
                  reject();
                }
              }
            };
            xhr.send(formData);
          }),
      );
      Promise.all(uploads)
        .then(async (file) => {
          setLoading(false);
          await artistsQuery.refetch();
          await albumsQuery.refetch();
          await tracksQuery.refetch();
          console.log(file);
          history.push('/artist');
        })
        .catch(() => {
          setLoading(false);
          history.push('/artist');
        });
    },
    [history, token, artistsQuery, albumsQuery, tracksQuery],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: loading,
    accept: 'audio/mpeg',
  });

  return (
    <>
      <Helmet>
        <title>Upload :: MusicPlayer.Cloud</title>
      </Helmet>
      {loading && <LinearProgress />}
      <UploadGrid>
        <UploadBox {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop here ...</Typography>
          ) : (
            <Typography>
              {loading ? 'Uploading...' : 'Drop or Click'}
            </Typography>
          )}
        </UploadBox>
      </UploadGrid>
    </>
  );
};

Upload.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Upload;
