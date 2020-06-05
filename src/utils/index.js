import { combineReducers } from 'redux';

import player from './player';
import music from './music';

const masterReducer = combineReducers({
  player,
  music,
});

export default masterReducer;
