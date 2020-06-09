import { createAction, handleActions } from 'redux-actions';

const SET_MUSICS = 'music/SET_MUSICS';
const ADD_MUSIC = 'music/ADD_MUSIC';
const INIT_MUSICS = 'music/INIT_MUSICS';

const initialState = {
  musics: [
    {
      musicId: '1',
      title: 'MIKI',
      artist: 'NANO!',
      album: '76539',
      imageLink: 'https://miel.dev/kwontf/fesmiki.png',
      audioLink: 'https://miel.dev/kwontf/01.mp3',
    },
    {
      musicId: '2',
      title: 'POKAPOKA',
      artist: 'HEART',
      album: '284',
      imageLink: null,
      audioLink: 'https://miel.dev/kwontf/02.mp3',
    },
  ],
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
