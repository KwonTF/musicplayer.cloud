import { createAction, handleActions } from 'redux-actions';

const PLAY_PAUSE_MUSIC = 'player/PLAY_PAUSE_MUSIC';
const SKIP_MUSIC = 'player/SKIP_MUSIC';
const INITIAL_PLAYER = 'player/INITIAL_PLAYER';
const CHANGE_OPEN = 'player/CHANGE_OPEN';
const ADD_MUSIC = 'player/ADD_MUSIC';
const REMOVE_MUSIC = 'player/REMOVE_MUSIC';

const initialState = {
  playList: [],
  nowPlaying: null,
  audio: null,
  playing: false,
  open: false,
};

export const playPauseMusic = createAction(PLAY_PAUSE_MUSIC);
export const skipMusic = createAction(SKIP_MUSIC);
export const initialPlayer = createAction(INITIAL_PLAYER);
export const changeOpen = createAction(CHANGE_OPEN);
export const addMusic = createAction(ADD_MUSIC, (music) => music);
export const removeMusic = createAction(REMOVE_MUSIC, (index) => index);

const player = handleActions(
  {
    [PLAY_PAUSE_MUSIC]: (state) => {
      if (state.audio) {
        if (state.playing) {
          state.audio.pause();
        } else {
          state.audio.play();
        }
      }

      return {
        ...state,
        playing: !state.playing,
      };
    },

    [SKIP_MUSIC]: (state) => {
      if (state.audio) {
        state.audio.pause();
      }

      const newList = state.playList;
      const nextMusic = newList.shift();

      if (nextMusic) {
        const audio = new Audio(nextMusic.audioLink);
        return {
          ...state,
          nowPlaying: nextMusic,
          playList: newList,
          playing: false,
          audio,
        };
      }

      return {
        ...state,
        nowPlaying: nextMusic,
        playList: newList,
        playing: false,
        audio: null,
        open: false,
      };
    },

    [CHANGE_OPEN]: (state) => {
      return {
        ...state,
        open: !state.open,
      };
    },

    [ADD_MUSIC]: (state, { payload }) => {
      if (!state.nowPlaying) {
        const audio = new Audio(payload.audioLink);
        return { ...state, nowPlaying: payload, playing: false, audio };
      }

      const newList = state.playList;
      newList.push(payload);
      return {
        ...state,
        playList: newList,
      };
    },

    [REMOVE_MUSIC]: (state, { payload }) => {
      const newList = state.playList;
      newList.splice(payload, 1);
      return {
        ...state,
        playList: newList,
      };
    },
    [INITIAL_PLAYER]: () => initialState,
  },
  initialState,
);

export default player;
