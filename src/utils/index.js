import { combineReducers } from 'redux';

import player from './player';
import music from './music';
import editor from './editor';

const masterReducer = combineReducers({
  player,
  music,
  editor,
});

export default masterReducer;
