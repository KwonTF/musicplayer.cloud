import PropTypes from 'prop-types';
import { Grid, styled, Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import React, { useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import API from '../utils/api';

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

  const onDrop = useCallback(acceptedFiles => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API.endpoint}/upload`);
    xhr.setRequestHeader(
      'authorization',
      `Bearer ${localStorage.getItem('userId') || ''}`,
    );
    const formData = new FormData();
    acceptedFiles.forEach(file => formData.append('files', file));
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 201) {
          console.log(xhr.responseText);
        } else {
          console.error(xhr.responseText);
        }
      }
    };
    xhr.send(formData);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'audio/mpeg',
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
