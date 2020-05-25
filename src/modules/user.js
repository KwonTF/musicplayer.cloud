import { createAction, handleActions } from 'redux-actions';

const USER_LOGIN = 'user/USER_LOGIN';
const INITIAL_USER = 'user/INITIAL_USER';

const initialState = {
  user: '',
};

export const userLogin = createAction(USER_LOGIN, (userId) => userId);
export const initialUser = createAction(INITIAL_USER);

const user = handleActions(
  {
    [USER_LOGIN]: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
    [INITIAL_USER]: () => initialState,
  },
  initialState
);

export default user;
