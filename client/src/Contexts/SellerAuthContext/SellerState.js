import React, { useReducer } from "react";
import axios from "axios";
// import { API } from "../../config";
import sellerAuthReducer from "./sellerAuthReducer";
import sellerAuthContext from "./sellerAuthContext";
import { setAuthSellerToken } from "../../utils/setAuthToken";
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

const SellerAuthState = (props) => {
	const initialState = {
		token: localStorage.getItem("sellerToken"),
		sellerError: null,
		isSellerAuthenticated: localStorage.getItem("sellerToken") ? true : false,
		loading: true,
		seller: null,
	};

	const [state, dispatch] = useReducer(sellerAuthReducer, initialState);

	const loadSellerIfTokenFound = async () => {
		if (localStorage.sellerToken) {
			setAuthSellerToken(localStorage.sellerToken);
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			try {
				const res = await axios.get(
					"http://localhost:8000/api/seller/profile",
					config,
				);
				dispatch({ type: USER_LOADED, payload: res.data });
			} catch (error) {
				dispatch({ type: AUTH_ERROR });
			}
		} else {
			return;
		}
	};

	const loadSeller = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		if (localStorage.selleToken) {
			setAuthSellerToken(localStorage.sellerToken);
		}
		try {
			const res = await axios.get(
				"http://localhost:8000/api/seller/profile",
				config,
			);
			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	const registerSeller = async (userData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post(
				"http://localhost:8000/api/seller/signup",
				userData,
				config,
			);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
			// loadSeller();
		} catch (error) {
			// console.log(error);
			dispatch({ type: REGISTER_FAIL, payload: error.message });
		}
	};

	const loginSeller = async (userData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post(
				"http://localhost:8000/api/seller/login",
				userData,
				config,
			);
			console.log(res);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		} catch (error) {
			dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
		}
	};

	const logoutSeller = () => {
		dispatch({ type: LOGOUT });
	};

	const clearSellerErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<sellerAuthContext.Provider
			value={{
				token: state.token,
				seller: state.user,
				sellerError: state.sellerError,
				isSellerAuthenticated: state.isSellerAuthenticated,
				loading: state.loading,
				registerSeller,
				clearSellerErrors,
				loadSeller,
				loadSellerIfTokenFound,
				loginSeller,
				logoutSeller,
			}}
		>
			{props.children}
		</sellerAuthContext.Provider>
	);
};

export default SellerAuthState;
