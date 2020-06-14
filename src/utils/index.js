import { combineReducers } from 'redux';

import player from './player';
import editor from './editor';

const masterReducer = combineReducers({
  player,
  editor,
});

export default masterReducer;
