import { GET_ALL_PRODUCTS, GET_SINGLE_PRODUCT } from "../types";

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
    default:
      return state;
  }
};
