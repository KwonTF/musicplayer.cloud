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
      imageLink:
        'https://w.namu.la/s/78324f93b5e26fdf201d9fff41b58577f046bda4a980f1d58be514b2d47cb8ba6aba38d47e09e98392ccd00e07483a747314135a0dfee8fd100106d0b2867943555c7d8cb90e72fe3f6f3544af21ae6931fb62f4acfe29990871d8a9a48c76310ae2585572bf66e3975081471e356843',
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
