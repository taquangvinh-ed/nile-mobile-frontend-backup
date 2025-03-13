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
    default:
      return state;
  }
};
