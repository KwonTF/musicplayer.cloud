import { createAction, handleActions } from "redux-actions";

const USER_LOGIN = "user/USER_LOGIN";
const USER_LOGOUT = "user/USER_LOGOUT";
const INITIAL_USER = "user/INITIAL_USER";

const initialState = {
	user: "",
};

export const userLogin = createAction(USER_LOGIN, (userId) => userId);
export const userLogout = createAction(USER_LOGOUT);
export const initialUser = createAction(INITIAL_USER);

const user = handleActions(
	{
		[USER_LOGIN]: (state, { payload }) => {
			try {
				localStorage.setItem("userId", payload);
			} catch (e) {
				console.log("Local Storage Error.");
			}
			return {
				...state,
				user: payload,
			};
		},
		[INITIAL_USER]: () => initialState,
		[USER_LOGOUT]: () => {
			localStorage.removeItem("userId");
			return initialState;
		},
	},
	initialState
);

export default user;
