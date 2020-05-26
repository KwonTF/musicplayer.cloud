import PropTypes from 'prop-types';
import { Grid, styled, Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import React, { useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadGrid = styled(Grid)({
  display: 'flex',
  width: '100%',
  height: '100%',
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
  const { userId } = useSelector(({ user }) => ({
    userId: user.user,
  }));

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'audio/*',
  });

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }
  }, [history, userId]);

  return (
    <UploadGrid>
      <UploadBox {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop here ...</Typography>
        ) : (
          <Typography>Drop or Click</Typography>
        )}
      </UploadBox>
    </UploadGrid>
  );
};

Upload.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Upload;
