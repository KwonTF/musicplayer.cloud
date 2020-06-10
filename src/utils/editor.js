import { createAction, handleActions } from 'redux-actions';

const OPEN_TRACK = 'editor/OPEN_TRACK';
const OPEN_ALBUM = 'editor/OPEN_ALBUM';
const SET_TRACK = 'editor/SET_TRACK';
const SET_ALBUM = 'editor/SET_ALBUM';
const CHANGE_EDIT = 'editor/CHANGE_EDIT';
const ON_CHANGE_FIELD = 'editor/ON_CHANGE_FIELD';

const initialState = {
  isTrackOpened: false,
  isAlbumOpened: false,
  albumName: '',
  albumArtist: '',
  albumCoverLink: '',
  trackName: '',
  trackArtist: '',
  trackNumber: 0,
  trackCoverLink: '',
  editing: false,
  targetId: '',
};

export const openTrack = createAction(OPEN_TRACK);
export const openAlbum = createAction(OPEN_ALBUM);
export const changeEdit = createAction(CHANGE_EDIT);
export const onChangeField = createAction(
  ON_CHANGE_FIELD,
  (fieldName, value) => ({ fieldName, value }),
);

export const setTrack = createAction(
  SET_TRACK,
  (trackName, trackArtist, trackNumber, trackCoverLink, targetId) => ({
    trackName,
    trackArtist,
    trackNumber,
    trackCoverLink,
    targetId,
  }),
);

export const setAlbum = createAction(
  OPEN_ALBUM,
  (albumName, albumArtist, albumCoverLink) => ({
    albumName,
    albumArtist,
    albumCoverLink,
  }),
);

const editor = handleActions(
  {
    [OPEN_TRACK]: (state) => {
      return {
        ...state,
        isTrackOpened: !state.isTrackOpened,
        isAlbumOpened: false,
      };
    },
    [OPEN_ALBUM]: (state) => {
      return {
        ...state,
        isTrackOpened: false,
        isAlbumOpened: !state.isAlbumOpened,
      };
    },
    [CHANGE_EDIT]: (state) => {
      return {
        ...state,
        editing: !state.editing,
      };
    },
    [SET_ALBUM]: (state, { payload }) => {
      return {
        ...state,
        albumName: payload.albumName,
        albumArtist: payload.albumArtist,
        albumCoverLink: payload.albumCoverLink,
      };
    },
    [SET_TRACK]: (state, { payload }) => {
      return {
        ...state,
        trackName: payload.trackName,
        trackArtist: payload.trackArtist,
        trackNumber: payload.trackNumber,
        trackCoverLink: payload.trackCoverLink,
        targetId: payload.targetId,
      };
    },
    [ON_CHANGE_FIELD]: (state, { payload }) => {
      const newState = state;
      newState[payload.fieldName] = payload.value;
      return newState;
    },
  },
  initialState,
);

export default editor;
