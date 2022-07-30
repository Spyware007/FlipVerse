import {
	GET_ALL_PRODUCTS,
	GET_SINGLE_PRODUCT,
	GET_PRODUCTS_BY_CATEGORY,
	GET_PURCHASED_PRODUCTS,
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: action.payload.products,
			};
		case GET_SINGLE_PRODUCT:
			return {
				...state,
				product: action.payload,
			};
		case GET_PRODUCTS_BY_CATEGORY:
			return {
				...state,
				categorizedProducts: action.payload,
			};
		case GET_PURCHASED_PRODUCTS:
			return {
				...state,
				purchasedProducts: action.payload,
			};
		default:
			return state;
	}
};
