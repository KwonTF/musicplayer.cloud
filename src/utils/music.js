import { createAction, handleActions } from 'redux-actions';

const SET_MUSICS = 'music/SET_MUSICS';
const ADD_MUSIC = 'music/ADD_MUSIC';
const INIT_MUSICS = 'music/INIT_MUSICS';

const initialState = {
  musics: [],
};

export const setMusics = createAction(SET_MUSICS, (musics) => musics);
export const addMusic = createAction(ADD_MUSIC, (music) => music);
export const initMusics = createAction(INIT_MUSICS);

const music = handleActions(
  {
    [INIT_MUSICS]: () => initialState,

    [SET_MUSICS]: (state, { payload }) => ({
      ...state,
      musics: payload,
    }),

    [ADD_MUSIC]: (state, { payload }) => {
      const newList = state.musics;
      newList.push(payload);
      return { ...state, musics: newList };
    },
  },
  initialState,
);

export default music;
