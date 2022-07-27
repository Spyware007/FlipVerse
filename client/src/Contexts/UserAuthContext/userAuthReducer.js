import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_ERRORS,
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				isUserAuthenticated: false,
				loading: false,
				token: action.payload.token,
				user: action.payload,
			};
		case LOGIN_SUCCESS:
			console.log(action.payload);
			localStorage.setItem("userToken", action.payload.token);
			return {
				...state,
				isUserAuthenticated: true,
				loading: false,
				token: action.payload.token,
				user: action.payload,
			};
		case USER_LOADED:
			return {
				...state,
				isUserAuthenticated: true,
				error: null,
				loading: false,
				user: action.payload,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case AUTH_ERROR:
			localStorage.removeItem("userToken");
			return {
				...state,
				isUserAuthenticated: false,
				loading: false,
				error: action.payload,
				token: null,
				user: null,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
