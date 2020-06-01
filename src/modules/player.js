import { createAction, handleActions } from 'redux-actions';

const PLAY_MUSIC = 'player/PLAY_MUSIC';
const PAUSE_MUSIC = 'player/PAUSE_MUSIC';
const SKIP_MUSIC = 'player/SKIP_MUSIC';
const INITIAL_PLAYER = 'player/INITIAL_PLAYER';

const initialState = {
  playlist: [],
  playing: false,
};

export const playMusic = createAction(PLAY_MUSIC);
export const pauseMusic = createAction(PAUSE_MUSIC);
export const skipMusic = createAction(SKIP_MUSIC);
export const initialPlayer = createAction(INITIAL_PLAYER);

const player = handleActions(
  {
    [PLAY_MUSIC]: (state) => {
      return {
        ...state,
        playing: true,
      };
    },
    [PAUSE_MUSIC]: (state) => {
      return {
        ...state,
        playing: false,
      };
    },
    [SKIP_MUSIC]: (state) => state,
    [INITIAL_PLAYER]: () => initialState,
  },
  initialState
);

export default player;
