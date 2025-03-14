import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_THIRD_LEVELS_FAILURE,
  GET_THIRD_LEVELS_REQUEST,
  GET_THIRD_LEVELS_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (registerData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    const user = response.data;
    console.log("user", user);
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(registerSuccess(user));
    return { payload: { success: true, user } };
  } catch (error) {
    dispatch(registerFailure(error.message));
    return { payload: { success: false, error: error.message } };
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (loginData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    const user = response.data;

    if (!user || !user.jwt) {
      throw new Error("Invalid response from server: No JWT token");
    }

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(loginSuccess(user));
    return { payload: { success: true, user } };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { payload: { success: false, error: error.message } };
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found");
    }
    const response = await axios.get(`${API_BASE_URL}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    dispatch(getUserSuccess(user));
    return { payload: { success: true, user } };
  } catch (error) {
    dispatch(getUserFailure(error.message));
    return { payload: { success: false, error: error.message } };
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};

const getProductsRequest = () => ({ type: GET_PRODUCTS_REQUEST });
const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});
const getProductsFailure = (error) => ({
  type: GET_PRODUCTS_FAILURE,
  payload: error,
});

export const getProductsByThirdLevel = (thirdLevel) => async (dispatch) => {
  dispatch(getProductsRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/filter`, {
      params: { thirdLevel, pageNumber: 0, pageSize: 8 },
    });
    const products = response.data.content;
    dispatch(getProductsSuccess(products));
    return { payload: { success: true, products } };
  } catch (error) {
    dispatch(getProductsFailure(error.message));
    return { payload: { success: false, error: error.message } };
  }
};

const getThirdLevelsRequest = () => ({ type: GET_THIRD_LEVELS_REQUEST });
const getThirdLevelsSuccess = (thirdLevels) => ({
  type: GET_THIRD_LEVELS_SUCCESS,
  payload: thirdLevels,
});
const getThirdLevelsFailure = (error) => ({
  type: GET_THIRD_LEVELS_FAILURE,
  payload: error,
});

export const getThirdLevels = () => async (dispatch) => {
  dispatch(getThirdLevelsRequest());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/products/third-levels`
    );
    const thirdLevels = response.data;
    dispatch(getThirdLevelsSuccess(thirdLevels));
    return { payload: { success: true, thirdLevels } };
  } catch (error) {
    dispatch(getThirdLevelsFailure(error.message));
    return { payload: { success: false, error: error.message } };
  }
};
