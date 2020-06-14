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
import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import {
  onChangeField,
  changeEdit,
  initEditor,
  albumEdit,
} from '../utils/editor';
import {
  REMOVE_TRACK,
  UPDATE_ALBUM,
  UPDATE_TRACK,
  ALBUMS_QUERY,
  TRACKS_QUERY,
  ARTISTS_QUERY,
  ALBUM_QUERY,
} from '../utils/query';

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

const TrackEditor = () => {
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
    trackId,
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
    trackId: editor.trackId,
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
      if (trackEditing) {
        updateTrack({
          variables: {
            trackId,
            album: albumName,
            albumArtist,
            artist: trackArtist,
            title: trackName,
            trackNumber: parseInt(trackNumber, 10),
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
                albumId: parseInt(albumId, 10),
              },
            },
          ],
        });
      } else {
        updateAlbum({
          variables: {
            albumId: parseInt(albumId, 10),
            album: albumName,
            albumArtist,
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
                albumId: parseInt(albumId, 10),
              },
            },
          ],
        });
      }
      dispatch(initEditor());
    }
    dispatch(changeEdit());
  }, [
    trackId,
    trackName,
    trackArtist,
    trackNumber,
    editing,
    dispatch,
    updateTrack,
    albumArtist,
    albumName,
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
    removeTrack({
      variables: { trackId },
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
            albumId: parseInt(albumId, 10),
          },
        },
      ],
    });
    dispatch(initEditor());
  }, [removeTrack, trackId, dispatch, albumId]);

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

export default TrackEditor;
