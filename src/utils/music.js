import { createAction, handleActions } from 'redux-actions';

const SET_MUSICS = 'music/SET_MUSICS';
const ADD_MUSIC = 'music/ADD_MUSIC';
const INIT_MUSICS = 'music/INIT_MUSICS';
const EDIT_MUSIC = 'music/EDIT_MUSIC';

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
export const editMusic = createAction(
  EDIT_MUSIC,
  (musicId, title, artist, track) => ({ musicId, title, artist, track }),
);

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

    [EDIT_MUSIC]: (state, { payload }) => {
      const newMusics = state.musics.map((musicItem) => {
        if (payload.musicId === musicItem.musicId) {
          return {
            ...musicItem,
            title: payload.title,
            artist: payload.artist,
            track: parseInt(payload.track, 10),
          };
        }
        return musicItem;
      });

      return { ...state, musics: newMusics };
    },
  },
  initialState,
);

export default music;
