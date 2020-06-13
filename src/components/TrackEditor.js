import React, { useCallback } from 'react';
import { styled, withStyles } from '@material-ui/styles';
import {
  Backdrop,
  CardMedia,
  Button,
  TextField,
  Box,
  makeStyles,
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  onChangeField,
  changeEdit,
  initEditor,
  albumEdit,
} from '../utils/editor';
import { musicUploaded } from '../utils/music';

const REMOVE_TRACK = gql`
  mutation removingMutations($Id: String!) {
    removeTrack(trackId: $Id)
  }
`;

const UPDATE_TRACK = gql`
  mutation updatingMutations(
    $Id: String!
    $album: String!
    $albumArtist: String!
    $artist: String!
    $title: String!
    $trackNumber: Int!
  ) {
    updateTrack(
      trackId: $Id
      album: $album
      albumArtist: $albumArtist
      artist: $artist
      title: $title
      trackNumber: $trackNumber
    ) {
      trackId
    }
  }
`;

const UPDATE_ALBUM = gql`
  mutation updatingAlbums($Id: Int!, $album: String!, $albumArtist: String!) {
    updateAlbum(albumId: $Id, artist: $albumArtist, title: $album) {
      albumId
    }
  }
`;
const TrackBackDrop = styled(Backdrop)({ display: 'flex', zIndex: 1 });
const useStyles = makeStyles(() => ({
  input: { color: '#FFFFFF' },
}));
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#FFFFFF',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FFFFFF',
    },
  },
})(TextField);

const textLabelStyle = { color: '#F0F0F0', textShadow: '#000000 1px 1px 1px' };
const ButtonBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

const TrackEditor = ({ history }) => {
  const [removeTrack] = useMutation(REMOVE_TRACK);
  const [updateTrack] = useMutation(UPDATE_TRACK);
  const [updateAlbum] = useMutation(UPDATE_ALBUM);
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    isTrackOpened,
    trackName,
    trackArtist,
    trackNumber,
    trackCoverLink,
    editing,
    targetId,
    albumName,
    albumArtist,
    trackEditing,
    albumId,
  } = useSelector(({ editor }) => ({
    isTrackOpened: editor.isTrackOpened,
    trackName: editor.trackName,
    trackArtist: editor.trackArtist,
    trackNumber: editor.trackNumber,
    trackCoverLink: editor.trackCoverLink,
    editing: editor.editing,
    targetId: editor.targetId,
    albumName: editor.albumName,
    albumArtist: editor.albumArtist,
    trackEditing: editor.trackEditing,
    albumId: editor.albumId,
  }));

  const closeEditor = useCallback(() => {
    dispatch(initEditor());
  }, [dispatch]);

  const anotherEditor = useCallback(() => {
    dispatch(albumEdit());
  }, [dispatch]);

  const startEditing = useCallback(() => {
    if (editing) {
      // dispatch(editMusic(targetId, trackName, trackArtist, trackNumber));
      // dispatch(musicEdited(targetId, trackName, trackArtist, trackNumber));
      if (trackEditing) {
        updateTrack({
          variables: {
            Id: targetId,
            album: albumName,
            albumArtist,
            artist: trackArtist,
            title: trackName,
            trackNumber: parseInt(trackNumber, 10),
          },
        });
      } else {
        updateAlbum({
          variables: {
            Id: parseInt(albumId, 10),
            album: albumName,
            albumArtist,
          },
        });
      }
      history.push('/artist');
      dispatch(initEditor());
      dispatch(musicUploaded());
    }
    dispatch(changeEdit());
  }, [
    targetId,
    trackName,
    trackArtist,
    trackNumber,
    editing,
    dispatch,
    updateTrack,
    albumArtist,
    albumName,
    history,
    trackEditing,
    updateAlbum,
    albumId,
  ]);

  const onChangeEditor = useCallback(
    (e) => {
      dispatch(onChangeField(e.target.id, e.target.value));
    },
    [dispatch],
  );

  const onDeleteMusic = useCallback(() => {
    removeTrack({ variables: { Id: targetId } });
    history.push('/artist');
    dispatch(initEditor());
    dispatch(musicUploaded());
  }, [history, removeTrack, targetId, dispatch]);

  return (
    <TrackBackDrop open={isTrackOpened}>
      <CardMedia
        component="img"
        image={trackCoverLink}
        alt={trackName}
        height={320}
        style={{ width: 320 }}
        color="#FFFFFF"
      />
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '1em',
          height: 320,
          justifyContent: 'space-between',
        }}
      >
        {trackEditing ? (
          <>
            <CssTextField
              id="trackName"
              label="Music Name"
              value={trackName}
              onChange={onChangeEditor}
              inputProps={{
                readOnly: !editing,
                className: classes.input,
              }}
              InputLabelProps={{
                style: textLabelStyle,
              }}
            />
            <CssTextField
              id="trackArtist"
              label="Music Artist"
              onChange={onChangeEditor}
              value={trackArtist}
              inputProps={{ readOnly: !editing, className: classes.input }}
              InputLabelProps={{
                style: textLabelStyle,
              }}
            />
            <CssTextField
              id="trackNumber"
              label="Track Number"
              onChange={onChangeEditor}
              value={trackNumber}
              inputProps={{ readOnly: !editing, className: classes.input }}
              InputLabelProps={{
                style: textLabelStyle,
              }}
            />
          </>
        ) : (
          <>
            <CssTextField
              id="albumName"
              label="Album Name"
              value={albumName}
              onChange={onChangeEditor}
              inputProps={{
                readOnly: !editing,
                className: classes.input,
              }}
              InputLabelProps={{
                style: textLabelStyle,
              }}
            />
            <CssTextField
              id="albumArtist"
              label="Almum Artist"
              onChange={onChangeEditor}
              value={albumArtist}
              inputProps={{ readOnly: !editing, className: classes.input }}
              InputLabelProps={{
                style: textLabelStyle,
              }}
            />
          </>
        )}
        <ButtonBox>
          <Button
            onClick={onDeleteMusic}
            style={{
              color: '#eeeeee',
              backgroundColor: '#333333',
              marginRight: '1em',
            }}
          >
            Delete Music
          </Button>
          <Button
            onClick={startEditing}
            style={{
              color: '#eeeeee',
              backgroundColor: '#43BCCD',
              marginRight: '1em',
            }}
          >
            {editing ? 'Done' : 'Edit'}
          </Button>
          <Button
            onClick={closeEditor}
            style={{
              color: '#eeeeee',
              backgroundColor: '#EA3546',
            }}
          >
            Close
          </Button>
          <Button
            onClick={anotherEditor}
            style={{
              color: '#222222',
              backgroundColor: '#25F2A3',
              marginLeft: '1em',
            }}
          >
            {trackEditing ? 'Edit Album' : 'Edit Track'}
          </Button>
        </ButtonBox>
      </form>
    </TrackBackDrop>
  );
};
TrackEditor.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(TrackEditor);
