import { GET_ALL_PRODUCTS } from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload.products,
      };
    default:
      return state;
  }
};
