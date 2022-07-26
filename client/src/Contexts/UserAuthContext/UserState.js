import React, { useReducer } from "react";
import axios from "axios";
// import { API } from "../../config";
import userAuthReducer from "./userAuthReducer";
import userAuthContext from "./userAuthContext";
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

const UserAuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    error: null,
    isAuthenticated: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(userAuthReducer, initialState);

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
      const res = await axios.get(
        "http://localhost:8000/api/user/profile",
        userData,
        config
      );
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
      const res = await axios.post(
        "http://localhost:8000/api/user/signup",
        userData,
        config
      );
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
      // const data = res.json();
      // console.log(res);
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
      const res = await axios.post(
        "http://localhost:8000/api/user/login",
        userData,
        config
      );
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
    <userAuthContext.Provider
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
    </userAuthContext.Provider>
  );
};

export default UserAuthState;
