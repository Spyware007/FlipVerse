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
	ADD_PRODUCT,
	ADD_PRODUCT_FAIL,
	ADD_IMAGE,
	ADD_IMAGE_FAIL,
	GET_SELLER_PRODUCTS,
	UPDATE_IMAGE,
	UPDATE_PROFILE,
} from "../types";

const SellerAuthState = (props) => {
	const initialState = {
		token: localStorage.getItem("sellerToken"),
		sellerError: null,
		isSellerAuthenticated: localStorage.getItem("sellerToken") ? true : false,
		loading: true,
		seller: null,
		itemsReadyToBeBought: [],
		products: [],
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

	//   Product State

	const addProduct = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post("/api/product", formData, config);
			// const res2 = await axios.put(
			//   `http://localhost:8000/api/product/${sellerId}`,
			//   image,
			//   config
			// );
			// const res = { res1, res2 };
			console.log(res);
			dispatch({ type: ADD_PRODUCT, payload: res.data });
		} catch (error) {
			// console.log(error);
			dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	const addImageToProduct = async (image, seller, id) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const data = { image, seller };
		try {
			const res = await axios.put(
				`http://localhost:8000/api/product/${id}`,
				data,
				config,
			);
			dispatch({ type: ADD_IMAGE, payload: res.data });
		} catch (error) {
			// console.log(error);
			dispatch({ type: ADD_IMAGE_FAIL, payload: error.message });
		}
	};

	const getSellerProducts = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.get(`/api/product`, config);
			dispatch({ type: GET_SELLER_PRODUCTS, payload: res.data.sellerProducts });
		} catch (error) {
			// console.log(error);
			// dispatch({ type: ADD_IMAGE_FAIL, payload: error.message });
			console.log(error);
		}
	};

	// Update Profile
	const updateImage = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.put(
				`/api/seller/profile/image`,
				formData,
				config,
			);
			dispatch({ type: UPDATE_IMAGE });
		} catch (error) {
			// console.log(error);
			// dispatch({ type: ADD_IMAGE_FAIL, payload: error.message });
			console.log(error);
		}
	};

	const updateProfile = async (user) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.put(`/api/seller/profile`, user, config);
			dispatch({ type: UPDATE_PROFILE, payload: res.data });
		} catch (error) {
			// console.log(error);
			// dispatch({ type: ADD_IMAGE_FAIL, payload: error.message });
			console.log(error);
		}
	};

	return (
		<sellerAuthContext.Provider
			value={{
				token: state.token,
				seller: state.seller,
				products: state.products,
				sellerError: state.sellerError,
				isSellerAuthenticated: state.isSellerAuthenticated,
				loading: state.loading,
				registerSeller,
				clearSellerErrors,
				loadSeller,
				loadSellerIfTokenFound,
				loginSeller,
				logoutSeller,
				addProduct,
				addImageToProduct,
				getSellerProducts,
				updateImage,
				updateProfile,
			}}
		>
			{props.children}
		</sellerAuthContext.Provider>
	);
};

export default SellerAuthState;
