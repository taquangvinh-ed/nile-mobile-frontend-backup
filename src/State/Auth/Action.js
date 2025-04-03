import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_REVIEWS_FAILURE,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_SECOND_LEVELS_FAILURE,
  GET_SECOND_LEVELS_REQUEST,
  GET_SECOND_LEVELS_SUCCESS,
  GET_THIRD_LEVELS_FAILURE,
  GET_THIRD_LEVELS_REQUEST,
  GET_THIRD_LEVELS_SUCCESS,
  GET_USER_ADDRESSES_FAILURE,
  GET_USER_ADDRESSES_REQUEST,
  GET_USER_ADDRESSES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  PAYMENT_RESET,
  PAYMENT_VERIFY_FAIL,
  PAYMENT_VERIFY_REQUEST,
  PAYMENT_VERIFY_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_CART_ITEM_QUANTITY_FAILURE,
  UPDATE_CART_ITEM_QUANTITY_REQUEST,
  UPDATE_CART_ITEM_QUANTITY_SUCCESS,
  UPDATE_CART_ITEM_SELECTION,
  UPDATE_CART_ITEM_SELECTION_FAILURE,
  UPDATE_CART_ITEM_SELECTION_REQUEST,
  UPDATE_CART_ITEM_SELECTION_SUCCESS,
} from "./ActionType";

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (registerData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
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
    const userDetails = await dispatch(getUser());

    if (!userDetails.payload.success) {
      throw new Error(userDetails.payload.error);
    }
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

    // Đảm bảo user có id (hoặc userId, tùy backend)
    if (!user.id && user.userId) {
      user.id = user.userId; // Ánh xạ userId thành id nếu backend trả về userId
    }

    if (!user.id) {
      throw new Error("User ID not found in response");
    }
    dispatch(getUserSuccess(user));
    return { payload: { success: true, user } };
  } catch (error) {
    const status = error.response?.status;
    let errorMessage = error.response?.data?.message || error.message || "Failed to fetch user";

    if (status === 401) {
      errorMessage = "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
      dispatch(logout());
    }

    dispatch(getUserFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
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

export const getProductsBySecondLevel = (secondLevel) => async (dispatch) => {
  dispatch(getProductsRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/filter`, {
      params: { secondLevel, pageNumber: 0, pageSize: 8 },
    });
    const products = response.data.content;
    dispatch(getProductsSuccess(products));
    return { payload: { success: true, products } };
  } catch (error) {
    dispatch(getProductsFailure(error.message));
    return { payload: { success: false, error: error.message } };
  }
};

const getSecondLevelsRequest = () => ({ type: GET_SECOND_LEVELS_REQUEST });
const getSecondLevelsSuccess = (secondLevels) => ({
  type: GET_SECOND_LEVELS_SUCCESS,
  payload: secondLevels,
});
const getSecondLevelsFailure = (error) => ({
  type: GET_SECOND_LEVELS_FAILURE,
  payload: error,
});

export const getSecondLevels = () => async (dispatch) => {
  dispatch(getSecondLevelsRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/second-levels`);
    const secondLevels = response.data;
    dispatch(getSecondLevelsSuccess(secondLevels));
    return { payload: { success: true, secondLevels } };
  } catch (error) {
    dispatch(getSecondLevelsFailure(error.message));
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
    const response = await axios.get(`${API_BASE_URL}/api/products/third-levels`);
    const thirdLevels = response.data;
    dispatch(getThirdLevelsSuccess(thirdLevels));
    return { payload: { success: true, thirdLevels } };
  } catch (error) {
    dispatch(getThirdLevelsFailure(error.message));
    return { payload: { success: false, error: error.message } };
  }
};

const getProductDetailsRequest = () => ({ type: GET_PRODUCT_DETAILS_REQUEST });
const getProductDetailsSuccess = (product) => ({
  type: GET_PRODUCT_DETAILS_SUCCESS,
  payload: product,
});
const getProductDetailsFailure = (error) => ({
  type: GET_PRODUCT_DETAILS_FAILURE,
  payload: error,
});

export const getProductDetails = (productId) => async (dispatch) => {
  dispatch(getProductDetailsRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/id/${productId}`);
    const product = response.data;
    dispatch(getProductDetailsSuccess(product));
    return { payload: { success: true, product } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch product details";
    dispatch(getProductDetailsFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

const addToCartRequest = () => ({ type: ADD_TO_CART_REQUEST });
const addToCartSuccess = (cartItem) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: cartItem,
});
const addToCartFailure = (error) => ({
  type: ADD_TO_CART_FAILURE,
  payload: error,
});

export const addToCart = (variation) => async (dispatch) => {
  dispatch(addToCartRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/cart/items`,
      { variation },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const cartItem = { ...response.data, isSelected: false };
    dispatch(addToCartSuccess(cartItem));
    return { payload: { success: true, cartItem } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to add to cart";
    dispatch(addToCartFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

const getCartRequest = () => ({ type: GET_CART_REQUEST });
const getCartSuccess = (cart) => ({ type: GET_CART_SUCCESS, payload: cart });
const getCartFailure = (error) => ({ type: GET_CART_FAILURE, payload: error });

export const getCart = () => async (dispatch) => {
  dispatch(getCartRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    const response = await axios.get(`${API_BASE_URL}/api/user/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cartData = response.data;
    console.log("Raw cart data from API:", cartData); // Log dữ liệu thô từ API
    const cartWithSelection = {
      ...cartData,
      cartItems: cartData.cartItems.map((item) => ({
        ...item,
        isSelected: item.selected !== null ? item.selected : false,
      })),
    };
    dispatch(getCartSuccess(cartWithSelection));
    return { payload: { success: true, cart: cartWithSelection } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch cart";
    dispatch(getCartFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

// export const updateCartItemSelection = (cartItemId, isSelected) => ({
//   type: UPDATE_CART_ITEM_SELECTION,
//   payload: { cartItemId, isSelected },
// });

export const updateCartItemSelectionRequest = () => ({
  type: UPDATE_CART_ITEM_SELECTION_REQUEST,
});

export const updateCartItemSelectionSuccess = (cartItem) => ({
  type: UPDATE_CART_ITEM_SELECTION_SUCCESS,
  payload: cartItem,
});

export const updateCartItemSelectionFailure = (error) => ({
  type: UPDATE_CART_ITEM_SELECTION_FAILURE,
  payload: error,
});

const updateCartItemQuantityRequest = () => ({
  type: UPDATE_CART_ITEM_QUANTITY_REQUEST,
});
const updateCartItemQuantitySuccess = (cartItem) => ({
  type: UPDATE_CART_ITEM_QUANTITY_SUCCESS,
  payload: cartItem,
});
const updateCartItemQuantityFailure = (error) => ({
  type: UPDATE_CART_ITEM_QUANTITY_FAILURE,
  payload: error,
});

export const updateCartItemQuantity = (cartItemId, quantity) => async (dispatch) => {
  dispatch(updateCartItemQuantityRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    const response = await axios.put(
      `${API_BASE_URL}/api/cart/items/${cartItemId}`,
      null, // Không cần body vì quantity nằm trong query param
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          quantity: quantity,
        },
      }
    );
    const updatedCartItem = response.data;
    dispatch(updateCartItemQuantitySuccess(updatedCartItem));
    return { payload: { success: true, cartItem: updatedCartItem } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to update cart item quantity";
    dispatch(updateCartItemQuantityFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

const removeCartItemRequest = () => ({ type: REMOVE_CART_ITEM_REQUEST });
const removeCartItemSuccess = (cartItemId) => ({
  type: REMOVE_CART_ITEM_SUCCESS,
  payload: cartItemId,
});
const removeCartItemFailure = (error) => ({
  type: REMOVE_CART_ITEM_FAILURE,
  payload: error,
});

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch(removeCartItemRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    await axios.delete(`${API_BASE_URL}/api/cart/items/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(removeCartItemSuccess(cartItemId));
    // Sau khi xóa thành công, gọi lại getCart để cập nhật giỏ hàng
    dispatch(getCart());
    return { payload: { success: true } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to remove cart item";
    dispatch(removeCartItemFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

export const getUserAddresses = () => async (dispatch) => {
  dispatch({ type: GET_USER_ADDRESSES_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    const response = await axios.get(`${API_BASE_URL}/api/user/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const addresses = response.data;
    console.log("Addresses from API:", addresses); // Debug dữ liệu trả về

    // Kiểm tra dữ liệu trả về
    if (!Array.isArray(addresses)) {
      throw new Error("Invalid response: Addresses must be an array");
    }

    // Lọc các địa chỉ không hợp lệ (nếu có)
    const validAddresses = addresses.filter(
      (address) => address && address.addressId && address.lastName && address.firstName && address.addressLine && address.ward && address.district && address.province && address.phoneNumber
    );

    dispatch({ type: GET_USER_ADDRESSES_SUCCESS, payload: validAddresses });
    return { payload: { success: true, addresses: validAddresses } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch addresses";
    dispatch({ type: GET_USER_ADDRESSES_FAILURE, payload: errorMessage });
    return { payload: { success: false, error: errorMessage } };
  }
};

export const updateAddress = (addressData) => async (dispatch) => {
  dispatch({ type: UPDATE_ADDRESS_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    const response = await axios.post(`${API_BASE_URL}/api/user/addresses`, addressData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const newAddress = response.data;
    dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: newAddress });

    // Gọi lại getUserAddresses để cập nhật danh sách
    const result = await dispatch(getUserAddresses());
    if (!result.payload.success) {
      throw new Error("Failed to refresh addresses after updating");
    }

    return { payload: { success: true, address: newAddress } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to update address";
    dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: errorMessage });
    return { payload: { success: false, error: errorMessage } };
  }
};

const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});
const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

export const createOrder = (userId, shippingAddress, selectedItems) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found, Please log in");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(`${API_BASE_URL}/api/orders/user/create?userId=${userId}`, { shippingAddress, selectedItems }, config);

    const order = response.data;
    dispatch(createOrderSuccess(order));
    return { payload: { success: true, order } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create order";
    dispatch(createOrderFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

const updateShippingAddressRequest = () => ({
  type: "UPDATE_SHIPPING_ADDRESS_REQUEST",
});
const updateShippingAddressSuccess = (order) => ({
  type: "UPDATE_SHIPPING_ADDRESS_SUCCESS",
  payload: order,
});
const updateShippingAddressFailure = (error) => ({
  type: "UPDATE_SHIPPING_ADDRESS_FAILURE",
  payload: error,
});

export const updateShippingAddress = (orderId, address) => async (dispatch) => {
  dispatch(updateShippingAddressRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(`${API_BASE_URL}/api/orders/${orderId}/update-shipping-address`, address, config);

    const order = response.data;
    dispatch(updateShippingAddressSuccess(order));
    return { payload: { success: true, order } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to update shipping address";
    dispatch(updateShippingAddressFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: "GET_ORDER_REQUEST" });
  try {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, config);
    dispatch({ type: "GET_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch order";
    dispatch({ type: "GET_ORDER_FAILURE", payload: errorMessage });
  }
};

export const updatePaymentMethod = (orderId, paymentMethod) => async (dispatch) => {
  dispatch({ type: "UPDATE_PAYMENT_METHOD_REQUEST" });
  try {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(`${API_BASE_URL}/api/orders/${orderId}/update-payment-method`, { paymentMethod }, config);

    const updatedOrder = response.data;

    // Nếu là VNPAY, gọi API để lấy paymentUrl
    let paymentUrl = "";
    if (paymentMethod === "VNPAY") {
      const vnpayResponse = await axios.get(`${API_BASE_URL}/api/payment-vnpay?orderId=${orderId}`, config);
      paymentUrl = vnpayResponse.data.paymentUrl;
    }

    dispatch({
      type: "UPDATE_PAYMENT_METHOD_SUCCESS",
      payload: { order: updatedOrder, paymentUrl },
    });
    return { payload: { success: true, order: updatedOrder, paymentUrl } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to update payment method";
    dispatch({
      type: "UPDATE_PAYMENT_METHOD_FAILURE",
      payload: errorMessage,
    });
    return { payload: { success: false, error: errorMessage } };
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: "DELETE_ORDER_REQUEST" });
  try {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    await axios.delete(`${API_BASE_URL}/api/orders/${orderId}`, config);
    dispatch({ type: "DELETE_ORDER_SUCCESS", payload: orderId });
    return { success: true, orderId }; // Trả về kết quả thành công
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to delete order";
    dispatch({ type: "DELETE_ORDER_FAILURE", payload: errorMessage });
    return { success: false, error: errorMessage }; // Trả về lỗi nếu thất bại
  }
};

export const createReview = (reviewData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${API_BASE_URL}/api/reviews`, reviewData, config);

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data,
    });

    return { success: true, payload: data };
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, error: error.message };
  }
};

export const deleteReview = (reviewId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const {
      auth: { jwt },
    } = getState();
    const config = { headers: { Authorization: `${jwt}` } };

    await axios.delete(`${API_BASE_URL}/api/reviews/${reviewId}`, config);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: reviewId,
    });

    return { success: true };
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, error: error.message };
  }
};

export const getReviewsByVariation = (variationId) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`${API_BASE_URL}/api/reviews/variation/${variationId}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data,
    });

    return { success: true, payload: data };
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, error: error.message };
  }
};

export const verifyPayment = (params) => async (dispatch) => {
  dispatch({ type: PAYMENT_VERIFY_REQUEST });

  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/api/payment-vnpay/verify?${queryString}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment verification failed");
    }

    if (data.code === "00") {
      dispatch({
        type: PAYMENT_VERIFY_SUCCESS,
        payload: {
          code: data.code,
          message: data.message,
        },
      });
    } else {
      dispatch({
        type: PAYMENT_VERIFY_FAIL,
        payload: {
          code: data.code,
          message: data.message,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: PAYMENT_VERIFY_FAIL,
      payload: {
        code: "99",
        message: error.message || "Error verifying payment",
      },
    });
  }
};

export const resetPayment = () => ({
  type: PAYMENT_RESET,
});

const getThirdLevelsBySecondLevelRequest = () => ({ type: GET_THIRD_LEVELS_REQUEST });
const getThirdLevelsBySecondLevelSuccess = (thirdLevels) => ({
  type: GET_THIRD_LEVELS_SUCCESS,
  payload: thirdLevels,
});
const getThirdLevelsBySecondFailure = (error) => ({
  type: GET_THIRD_LEVELS_FAILURE,
  payload: error,
});

export const getThirdLevelsBySecondLevel = (secondLevel) => async (dispatch) => {
  dispatch(getThirdLevelsBySecondLevelRequest()); // Sử dụng action creator mới
  try {
    const response = await axios.get(`${API_BASE_URL}/api/product/getThirdLevel?secondLevel=${secondLevel}`);
    const thirdLevels = response.data;
    dispatch(getThirdLevelsBySecondLevelSuccess(thirdLevels)); // Sử dụng action creator mới
    return { payload: { success: true, thirdLevels } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch third levels";
    dispatch(getThirdLevelsBySecondFailure(errorMessage)); // Sử dụng action creator mới
    return { payload: { success: false, error: errorMessage } };
  }
};

// State/Auth/Action.js
export const changePassword = (changePasswordData) => async (dispatch) => {
  try {
    const jwt = localStorage.getItem("jwt"); // Sửa từ "token" thành "jwt"
    console.log("JWT:", jwt); // Thêm log để kiểm tra
    if (!jwt) {
      throw new Error("No JWT found in localStorage");
    }

    const response = await axios.post("http://localhost:8081/api/user/change-password", changePasswordData, {
      headers: {
        Authorization: `Bearer ${jwt}`, // Sử dụng jwt
      },
    });
    dispatch({
      type: "CHANGE_PASSWORD_SUCCESS",
      payload: response.data,
    });
    return { success: true, message: response.data };
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error.response?.status === 401) {
      errorMessage = "Your session has expired. Please log in again.";
      localStorage.removeItem("jwt"); // Xóa jwt không hợp lệ
      window.location.href = "/login";
    } else {
      errorMessage = error.response?.data?.message || "An error occurred";
    }
    dispatch({
      type: "CHANGE_PASSWORD_FAIL",
      payload: errorMessage,
    });
    return { success: false, error: errorMessage };
  }
};

export const filterProductsSimple = (filters) => async (dispatch) => {
  try {
    const params = {
      minBattery: filters.minBattery,
      maxBattery: filters.maxBattery,
      minScreenSize: filters.minScreenSize,
      maxScreenSize: filters.maxScreenSize,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sort: filters.sort,
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
    };

    console.log("Simple filter params:", params);

    const response = await axios.get(`${API_BASE_URL}/api/products/filter-simple`, {
      params,
    });

    const result = {
      success: true,
      products: response.data.content || [],
    };

    dispatch({
      type: "FILTER_PRODUCTS_SIMPLE_SUCCESS",
      payload: result,
    });

    return result;
  } catch (error) {
    dispatch({
      type: "FILTER_PRODUCTS_SIMPLE_FAIL",
      payload: error.message,
    });
    return { success: false, error: error.message };
  }
};

const buyNowRequest = () => ({ type: "BUY_NOW_REQUEST" });
const buyNowSuccess = (cartItem) => ({
  type: "BUY_NOW_SUCCESS",
  payload: cartItem,
});
const buyNowFailure = (error) => ({
  type: "BUY_NOW_FAILURE",
  payload: error,
});

export const buyNow = (variationId) => async (dispatch) => {
  dispatch(buyNowRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/cart/items/buy-now`,
      { variationId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const cartItem = response.data;
    dispatch(buyNowSuccess(cartItem));
    return { payload: { success: true, cartItem } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to process buy now";
    dispatch(buyNowFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};

export const updateCartItemSelection = (cartItemId, selected) => async (dispatch) => {
  dispatch(updateCartItemSelectionRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No JWT token found. Please log in.");
    }

    const response = await axios.put(
      `${API_BASE_URL}/api/cart/items/${cartItemId}/select`, // Cập nhật endpoint
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          selected: selected,
        },
      }
    );
    const updatedCartItem = response.data;
    dispatch(updateCartItemSelectionSuccess(updatedCartItem));
    // Sau khi cập nhật selected, gọi lại getCart để làm mới toàn bộ giỏ hàng
    dispatch(getCart());
    return { payload: { success: true, cartItem: updatedCartItem } };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to update cart item selection";
    dispatch(updateCartItemSelectionFailure(errorMessage));
    return { payload: { success: false, error: errorMessage } };
  }
};
