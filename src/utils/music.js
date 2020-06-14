import { createAction, handleActions } from 'redux-actions';

const MUSIC_UPLOADED = 'music/MUSIC_UPLOADED';

const initialState = {
  uploaded: false,
};

export const musicUploaded = createAction(MUSIC_UPLOADED);
const music = handleActions(
  {
    [MUSIC_UPLOADED]: (state) => {
      return { ...state, uploaded: !state.uploaded };
    },
  },
  initialState,
);

export default music;
