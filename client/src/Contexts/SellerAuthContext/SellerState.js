import React, { useReducer } from "react";
import axios from "axios";
import { API } from "../../config";
import sellerAuthReducer from "./sellerAuthReducer";
import sellerAuthContext from "./sellerAuthContext";
import setAuthToken from "../../utils/setAuthToken";
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
    token: localStorage.getItem("token"),
    user: null,
    error: null,
    isAuthenticated: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(sellerAuthReducer, initialState);

  const loadUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post(`${API}/seller/login`, userData, config);
      console.log(res);
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
      const res = await axios.post(`${API}/seller/signup`, userData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      // loadUser();
      // const data = res.json();
      console.log(res);
    } catch (error) {
      console.log(error);
      // dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

  const login = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`${API}/seller/login`, userData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
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

  return (
    <sellerAuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        registerUser,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </sellerAuthContext.Provider>
  );
};

export default SellerAuthState;
