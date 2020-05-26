import { combineReducers } from 'redux';
import user from './user';

const masterReducer = combineReducers({
  user,
});

export default masterReducer;
