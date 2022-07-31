import React, { useReducer } from "react";
import axios from "axios";
// import { API } from "../../config";
import productReducer from "./productReducer";
import productContext from "./productContext";
// import { setAuthSellerToken } from "../../utils/setAuthToken";
import {
	GET_ALL_PRODUCTS,
	GET_SINGLE_PRODUCT,
	GET_PRODUCTS_BY_CATEGORY,
	GET_PURCHASED_PRODUCTS,
} from "../types";

const ProductState = (props) => {
	const initialState = {
		allProducts: [],
		product: {},
		categorizedProducts: [],
		purchasedProducts: [],
	};

	const [state, dispatch] = useReducer(productReducer, initialState);

	const dispatchProductWithWarranty = async (id, tokenId) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post(
				`/api/product/${id}`,
				{ tId: tokenId },
				config,
			);
			console.log(res.data);
			// dispatch({ type: GET_SINGLE_PRODUCT, payload: res.data });
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	const updateProductToken = async (id, tokenId, userId) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.put(
				`/api/product/token/${id}`,
				{ tId: tokenId, userId },
				config,
			);
			console.log(res.data);
			// dispatch({ type: GET_SINGLE_PRODUCT, payload: res.data });
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	const getSingleProduct = async (id) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.get(`/api/product/${id}`, config);
			dispatch({ type: GET_SINGLE_PRODUCT, payload: res.data });
			return res.data;
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	const orderProduct = async (productId, walletAddress) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post(
				`/api/product/purchase/${productId}`,
				{ walletAddress },
				config,
			);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const getAllProducts = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.get("/api/products", config);
			console.log(res);
			dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	const getCategorizedProducts = async (name) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post(
				"/api/products/category",
				{ category: name },
				config,
			);
			console.log(res);
			dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: res.data.products });
			return res.data.products;
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	const getPurchasedProducts = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.get("/api/user/purchased", config);

			dispatch({
				type: GET_PURCHASED_PRODUCTS,
				payload: res.data.purchasedProducts,
			});
			// return res.data;
		} catch (error) {
			console.log(error);
			//   dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
		}
	};

	return (
		<productContext.Provider
			value={{
				allProducts: state.allProducts,
				product: state.product,
				purchasedProducts: state.purchasedProducts,
				categorizedProducts: state.categorizedProducts,
				getSingleProduct,
				getAllProducts,
				updateProductToken,
				orderProduct,
				getCategorizedProducts,
				getPurchasedProducts,
				dispatchProductWithWarranty,
			}}
		>
			{props.children}
		</productContext.Provider>
	);
};

export default ProductState;
