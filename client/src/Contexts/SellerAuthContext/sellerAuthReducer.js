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
		case LOGIN_SUCCESS:
			console.log(action.payload.token);
			localStorage.setItem("token", action.payload.token);
			console.log("fsd");
			return {
				...state,
				...action.payload,
				isSellerAuthenticated: true,
				loading: false,
				token: action.payload.token,
			};
		case USER_LOADED:
			return {
				...state,
				isSellerAuthenticated: true,
				sellerError: null,
				loading: false,
				user: action.payload,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case AUTH_ERROR:
			localStorage.removeItem("token");
			return {
				...state,
				isSellerAuthenticated: false,
				loading: false,
				sellerError: action.payload,
				token: null,
				user: null,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				sellerError: null,
			};
		default:
			return state;
	}
};
