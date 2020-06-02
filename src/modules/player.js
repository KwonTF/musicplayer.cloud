import { createAction, handleActions } from 'redux-actions';

const PLAY_PAUSE_MUSIC = 'player/PLAY_PAUSE_MUSIC';
const SKIP_MUSIC = 'player/SKIP_MUSIC';
const INITIAL_PLAYER = 'player/INITIAL_PLAYER';
const CHANGE_OPEN = 'player/CHANGE_OPEN';
const ADD_MUSIC = 'player/ADD_MUSIC';

const initialState = {
  playList: [
    { musicId: '1', title: 'MIKI', artist: 'NANO!' },
    { musicId: '2', title: 'MIKI', artist: 'NANO!' },
    { musicId: '3', title: 'MIKI', artist: 'NANO!' },
  ],
  playing: false,
  open: false,
};

export const playPauseMusic = createAction(PLAY_PAUSE_MUSIC);
export const skipMusic = createAction(SKIP_MUSIC);
export const initialPlayer = createAction(INITIAL_PLAYER);
export const changeOpen = createAction(CHANGE_OPEN);
export const addMusic = createAction(ADD_MUSIC, (musicId, title, artist) => ({
  musicId,
  title,
  artist,
}));

const player = handleActions(
  {
    [PLAY_PAUSE_MUSIC]: (state) => {
      return {
        ...state,
        playing: !state.playing,
      };
    },
    [SKIP_MUSIC]: (state) => {
      const newList = state.playList;
      newList.shift();
      return {
        ...state,
        playList: newList,
      };
    },
    [CHANGE_OPEN]: (state) => {
      return {
        ...state,
        open: !state.open,
      };
    },
    [ADD_MUSIC]: (state, { payload }) => {
      const newList = state.playList;
      newList.push({
        musicId: payload.musicId,
        title: payload.title,
        artist: payload.artist,
      });

      return {
        ...state,
        playList: newList,
      };
    },
    [INITIAL_PLAYER]: () => initialState,
  },
  initialState
);

export default player;
