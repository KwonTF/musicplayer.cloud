import { combineReducers } from 'redux';
import user from './user';
import player from './player';

const masterReducer = combineReducers({
  user,
  player,
});

export default masterReducer;
