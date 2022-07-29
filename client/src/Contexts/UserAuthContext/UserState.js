import React, { useReducer } from "react";
import axios from "axios";
// import { API } from "../../config";
import userAuthReducer from "./userAuthReducer";
import userAuthContext from "./userAuthContext";
import { setAuthUserToken } from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  BUY_PRODUCT,
  BUY_PRODUCT_FAIL,
  UPDATE_IMAGE,
  UPDATE_PROFILE,
} from "../types";

const UserAuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("userToken"),
    user: null,
    error: null,
    isUserAuthenticated: localStorage.getItem("userToken") ? true : false,
    loading: true,
    myProducts: null,
  };

  const [state, dispatch] = useReducer(userAuthReducer, initialState);

  const loadUserIfTokenFound = async () => {
    if (localStorage.userToken) {
      setAuthUserToken(localStorage.userToken);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await axios.get("/api/user/profile", config);
        dispatch({ type: USER_LOADED, payload: res.data });
      } catch (error) {
        dispatch({ type: AUTH_ERROR });
      }
    }
  };

  const loadUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // console.log(localStorage.userToken);
    if (localStorage.userToken) {
      setAuthUserToken(localStorage.userToken);
    }
    try {
      const res = await axios.get("/api/user/profile", config);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const registerUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/signup", userData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      // loadUser();
    } catch (error) {
      // console.log(error);
      dispatch({ type: REGISTER_FAIL, payload: error.message });
    }
  };

  const login = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/user/login", userData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      // loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  // ADD TO CART

  //   const addToCart = async (id) => {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     try {
  //       const res = await axios.post(`/api/product/wishlist/${id}`, config);
  //       dispatch({ type: ADD_TO_CART, payload: res.data });
  //       // loadUser();
  //     } catch (error) {
  //       //   dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  //       console.log(error);
  //     }
  //   };
  //   BUUUY
  const buyProduct = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`/api/product/${id}`, config);
      dispatch({ type: BUY_PRODUCT, payload: res.data });
      // loadUser();
      console.log(res);
    } catch (error) {
      //   dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
      console.log(error);
    }
  };

  // Update image
  const updateImage = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`/api/user/profile/image`, formData, config);
      dispatch({ type: UPDATE_IMAGE });
    } catch (error) {
      // console.log(error);
      // dispatch({ type: ADD_IMAGE_FAIL, payload: error.message });
      console.log(error);
    }
  };
  //   Update profile
  const updateProfile = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(`/api/user/profile`, user, config);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });
    } catch (error) {
      // console.log(error);
      // dispatch({ type: ADD_IMAGE_FAIL, payload: error.message });
      console.log(error);
    }
  };

  return (
    <userAuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        isUserAuthenticated: state.isUserAuthenticated,
        loading: state.loading,
        registerUser,
        clearErrors,
        loadUser,
        loadUserIfTokenFound,
        login,
        logout,
        // addToCart,
        buyProduct,
        updateProfile,
        updateImage,
      }}
    >
      {props.children}
    </userAuthContext.Provider>
  );
};

export default UserAuthState;
