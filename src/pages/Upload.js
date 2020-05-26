import PropTypes from 'prop-types';
import { Grid, styled } from '@material-ui/core';
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
      Upload
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
      </div>
    </UploadGrid>
  );
};

Upload.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Upload;
