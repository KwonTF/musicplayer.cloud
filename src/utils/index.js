import { combineReducers } from 'redux';
import user from './user';
import player from './player';
import music from './music';

const masterReducer = combineReducers({
  user,
  player,
  music,
});

export default masterReducer;
