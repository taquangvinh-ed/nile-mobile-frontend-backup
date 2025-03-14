// import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

// const initialState = {
//     user: null,
//     isLoading: false,
//     error: null,
//     jwt: null
// };

// export const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case REGISTER_REQUEST:
//         case LOGIN_REQUEST:
//         case GET_USER_REQUEST:
//             return { ...state, isLoading: true, error: null };
//         case REGISTER_SUCCESS:
//             return { ...state, isLoading: false, user: action.payload.user, jwt: action.payload.jwt };
//         case LOGIN_SUCCESS:
//             return { ...state, isLoading: false, user: action.payload.user, jwt: action.payload.jwt };
//         case GET_USER_SUCCESS:
//             return { ...state, isLoading: false, user: action.payload };
//         case REGISTER_FAILURE:
//         case LOGIN_FAILURE:
//         case GET_USER_FAILURE:
//             return { ...state, isLoading: false, error: action.payload };
//         case LOGOUT:
//             return {...initialState, user: null, jwt: null };
//         default:
//             return state;
//     }
// };

import {
  GET_PRODUCT_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
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

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  products: [],
  productsLoading: false,
  productsError: null,
  thirdLevels: [],
  thirdLevelsLoading: false,
  thirdLevelsError: null,
  productDetails: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user || state.user, // Đảm bảo không ghi đè nếu không có user
        jwt: action.payload.user?.jwt || state.jwt, // Lấy jwt từ user nếu có
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user || state.user,
        jwt: action.payload.user?.jwt || state.jwt,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload || state.user,
        jwt: state.jwt, // Giữ nguyên jwt
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Unknown error",
      };
    case LOGOUT:
      return initialState;
    case GET_PRODUCTS_REQUEST:
      return { ...state, productsLoading: true, productsError: null };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload,
        productsError: null,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload,
      };
    case GET_THIRD_LEVELS_REQUEST:
      return { ...state, thirdLevelsLoading: true, thirdLevelsError: null };
    case GET_THIRD_LEVELS_SUCCESS:
      return {
        ...state,
        thirdLevelsLoading: false,
        thirdLevels: action.payload,
        thirdLevelsError: null,
      };
    case GET_THIRD_LEVELS_FAILURE:
      return {
        ...state,
        thirdLevelsLoading: false,
        thirdLevelsError: action.payload,
      };

    case GET_PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, productDetails: action.payload };
    case GET_PRODUCT_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
