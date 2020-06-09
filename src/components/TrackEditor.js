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
import { useSelector, useDispatch } from 'react-redux';
import { openTrack, onChangeField, changeEdit } from '../utils/editor';

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    isTrackOpened,
    trackName,
    trackArtist,
    trackNumber,
    trackCoverLink,
    editing,
  } = useSelector(({ editor }) => ({
    isTrackOpened: editor.isTrackOpened,
    trackName: editor.trackName,
    trackArtist: editor.trackArtist,
    trackNumber: editor.trackNumber,
    trackCoverLink: editor.trackCoverLink,
    editing: editor.editing,
  }));

  const closeEditor = useCallback(() => {
    dispatch(openTrack());
  }, [dispatch]);

  const startEditing = useCallback(() => {
    dispatch(changeEdit());
  }, [dispatch]);

  const onChangeEditor = useCallback(
    (e) => {
      dispatch(onChangeField(e.target.id, e.target.value));
    },
    [dispatch],
  );

  return (
    <TrackBackDrop open={isTrackOpened}>
      <CardMedia
        component="img"
        image={trackCoverLink || 'https://miel.dev/kwontf/dame.png'}
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
        <ButtonBox>
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
        </ButtonBox>
      </form>
    </TrackBackDrop>
  );
};

export default TrackEditor;
