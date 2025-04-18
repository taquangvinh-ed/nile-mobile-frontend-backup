import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
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
  UPDATE_CART_ITEM_SELECTION,
  UPDATE_CART_ITEM_QUANTITY_REQUEST,
  UPDATE_CART_ITEM_QUANTITY_SUCCESS,
  UPDATE_CART_ITEM_QUANTITY_FAILURE,
  GET_USER_ADDRESSES_FAILURE,
  GET_USER_ADDRESSES_SUCCESS,
  GET_USER_ADDRESSES_REQUEST,
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILURE,
  GET_ORDER_FAILURE,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_REQUEST,
  GET_SECOND_LEVELS_REQUEST,
  GET_SECOND_LEVELS_SUCCESS,
  GET_SECOND_LEVELS_FAILURE,
  CREATE_REVIEW_FAILURE,
  DELETE_REVIEW_FAILURE,
  GET_REVIEWS_FAILURE,
  GET_REVIEWS_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  CREATE_REVIEW_SUCCESS,
  GET_REVIEWS_REQUEST,
  DELETE_REVIEW_REQUEST,
  CREATE_REVIEW_REQUEST,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  PAYMENT_RESET,
  PAYMENT_VERIFY_FAIL,
  PAYMENT_VERIFY_SUCCESS,
  PAYMENT_VERIFY_REQUEST,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  products: [],
  productsLoading: false,
  productsError: null,
  secondLevels: [],
  secondLevelsLoading: false,
  secondLevelsError: null,
  thirdLevels: [],
  thirdLevelsLoading: false,
  thirdLevelsError: null,
  productDetails: null,
  isAuthenticated: false,
  productDetailsLoading: false,
  productDetailsError: null,
  cart: null, // Thay [] thành null để thống nhất với dữ liệu từ GET_CART
  cartLoading: false,
  cartError: null,
  cartSummary: { subtotal: 0, totalDiscount: 0, totalItems: 0 },
  addresses: [], // Thêm state để lưu danh sách địa chỉ
  addressesLoading: false,
  addressesError: null,
  order: null,
  orderLoading: false,
  orderError: null,
  removeCartItemLoading: false,
  removeCartItemError: null,
  reviews: [],
  reviewLoading: false,
  reviewError: null,
  loading: false,
  code: "",
  message: "",
  success: false,
  error: null,
  orders: [],
  ordersLoading: false,
  ordersError: null,
};

const calculateCartSummary = (cartItems) => {
  const selectedItems = cartItems?.filter((item) => item.isSelected) || [];
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const totalDiscount = selectedItems.reduce((sum, item) => sum + (item.discountPrice || 0), 0);
  const totalItems = selectedItems.reduce((sum, item) => sum + (item.quantity || 0), 0); // Sửa: tính tổng số lượng thay vì độ dài mảng
  return { subtotal, totalDiscount, totalItems };
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
        user: action.payload.user || state.user,
        jwt: action.payload.user?.jwt || state.jwt,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user || state.user,
        jwt: action.payload.user?.jwt || state.jwt,
        isAuthenticated: true,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload || state.user,
        jwt: state.jwt,
        isAuthenticated: true,
        error: null,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Unknown error",
        isAuthenticated: false,
        user: null,
        jwt: null,
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

    case GET_SECOND_LEVELS_REQUEST:
      return { ...state, secondLevelsLoading: true, secondLevelsError: null };
    case GET_SECOND_LEVELS_SUCCESS:
      return {
        ...state,
        secondLevelsLoading: false,
        secondLevels: action.payload,
        secondLevelsError: null,
      };
    case GET_SECOND_LEVELS_FAILURE:
      return {
        ...state,
        secondLevelsLoading: false,
        secondLevelsError: action.payload,
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
      return {
        ...state,
        productDetailsLoading: true,
        productDetailsError: null,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetailsLoading: false,
        productDetails: action.payload,
        productDetailsError: null,
      };
    case GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetailsLoading: false,
        productDetailsError: action.payload,
      };

    case ADD_TO_CART_REQUEST:
      return { ...state, cartLoading: true, cartError: null };
    case ADD_TO_CART_SUCCESS:
      const newCartItems = state.cart ? [...state.cart.cartItems, action.payload] : [action.payload];
      return {
        ...state,
        cartLoading: false,
        cart: {
          ...state.cart,
          cartItems: newCartItems,
        },
        cartSummary: calculateCartSummary(newCartItems),
        cartError: null,
      };
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload,
      };

    case GET_CART_REQUEST:
      return { ...state, cartLoading: true, cartError: null };
    case GET_CART_SUCCESS:
      const cartWithSelection = {
        ...action.payload,
        cartItems: action.payload.cartItems.map((item) => ({
          ...item,
          isSelected: item.selected !== null ? item.selected : false,
        })),
      };
      console.log("Cart with selection after GET_CART_SUCCESS:", cartWithSelection);
      return {
        ...state,
        cartLoading: false,
        cart: cartWithSelection,
        cartSummary: calculateCartSummary(cartWithSelection.cartItems),
        cartError: null,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload,
      };

    case UPDATE_CART_ITEM_SELECTION:
      const updatedCartItemsSelection = state.cart.cartItems.map((item) => (item.id === action.payload.cartItemId ? { ...item, isSelected: action.payload.isSelected } : item)) || [];
      return {
        ...state,
        cart: { ...state.cart, cartItems: updatedCartItemsSelection },
        cartSummary: calculateCartSummary(updatedCartItemsSelection),
      };

    case UPDATE_CART_ITEM_QUANTITY_REQUEST:
      return { ...state, cartLoading: true, cartError: null };
    case UPDATE_CART_ITEM_QUANTITY_SUCCESS:
      const updatedCartItemsQuantity =
        state.cart?.cartItems?.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload, isSelected: item.isSelected } // Giữ nguyên isSelected
            : item
        ) || [];
      return {
        ...state,
        cartLoading: false,
        cart: { ...state.cart, cartItems: updatedCartItemsQuantity },
        cartSummary: calculateCartSummary(updatedCartItemsQuantity),
        cartError: null,
      };
    case UPDATE_CART_ITEM_QUANTITY_FAILURE:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload,
      };
    case GET_USER_ADDRESSES_REQUEST:
      return { ...state, addressesLoading: true, addressesError: null };
    case GET_USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        addressesLoading: false,
        addresses: action.payload,
        addressesError: null,
      };

    case "REMOVE_CART_ITEM_REQUEST":
      return {
        ...state,
        removeCartItemLoading: true,
        removeCartItemError: null,
      };
    case "REMOVE_CART_ITEM_SUCCESS":
      const updatedCartItemsAfterRemove = state.cart?.cartItems?.filter((item) => item.id !== action.payload) || [];
      return {
        ...state,
        removeCartItemLoading: false,
        removeCartItemError: null,
        cart: {
          ...state.cart,
          cartItems: updatedCartItemsAfterRemove,
        },
        cacartSummary: calculateCartSummary(updatedCartItemsAfterRemove), // Thêm: tính lại cartSummaryrtSummary:
      };
    case "REMOVE_CART_ITEM_FAILURE":
      return {
        ...state,
        removeCartItemLoading: false,
        removeCartItemError: action.payload,
      };
    case GET_USER_ADDRESSES_FAILURE:
      return {
        ...state,
        addressesLoading: false,
        addressesError: action.payload,
      };
    case UPDATE_ADDRESS_REQUEST:
      return { ...state, addressesLoading: true, addressesError: null };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        addressesLoading: false,
        addresses: [...state.addresses, action.payload], // Thêm địa chỉ mới vào danh sách
        addressesError: null,
      };
    case UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        addressesLoading: false,
        addressesError: action.payload,
      };

    case CREATE_ORDER_REQUEST:
      return { ...state, orderLoading: true, orderError: null };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        order: action.payload,
        cart: null, // Xóa giỏ hàng sau khi tạo order (tùy yêu cầu)
        cartSummary: { subtotal: 0, totalDiscount: 0, totalItems: 0 },
      };
    case CREATE_ORDER_FAILURE:
      return { ...state, orderLoading: false, orderError: action.payload };

    case "UPDATE_SHIPPING_ADDRESS_REQUEST":
      return { ...state, orderLoading: true, orderError: null };
    case "UPDATE_SHIPPING_ADDRESS_SUCCESS":
      return { ...state, orderLoading: false, order: action.payload };
    case "UPDATE_SHIPPING_ADDRESS_FAILURE":
      return { ...state, orderLoading: false, orderError: action.payload };
    case GET_ORDER_REQUEST:
      return { ...state, orderLoading: true, orderError: null };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        order: action.payload, // Cập nhật order với dữ liệu từ API
        orderError: null,
      };
    case GET_ORDER_FAILURE:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
        order: null, // Đặt lại order khi có lỗi
      };
    case DELETE_ORDER_REQUEST:
      return { ...state, orderLoading: true, orderError: null };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        order: null, // Đặt lại order về null sau khi xóa
        orderError: null,
      };
    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    case CREATE_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
    case GET_REVIEWS_REQUEST:
      return { ...state, reviewLoading: true, reviewError: null };

    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviewLoading: false,
        reviews: [...state.reviews, action.payload],
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        reviewLoading: false,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };

    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewLoading: false,
        reviews: action.payload,
      };

    case CREATE_REVIEW_FAILURE:
    case DELETE_REVIEW_FAILURE:
    case GET_REVIEWS_FAILURE:
      return { ...state, reviewLoading: false, reviewError: action.payload };

    case "UPDATE_PAYMENT_METHOD_REQUEST":
      return { ...state, orderLoading: true, orderError: null };
    case "UPDATE_PAYMENT_METHOD_SUCCESS":
      return {
        ...state,
        orderLoading: false,
        order: action.payload.order,
        paymentUrl: action.payload.paymentUrl, // Lưu paymentUrl vào state
        orderError: null,
      };
    case "UPDATE_PAYMENT_METHOD_FAILURE":
      return {
        ...state,
        orderLoading: false,
        orderError: action.payload,
      };
    case PAYMENT_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case PAYMENT_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        code: action.payload.code,
        message: action.payload.message,
        success: true,
        error: null,
      };
    case PAYMENT_VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        code: action.payload.code,
        message: action.payload.message,
        success: false,
        error: action.payload.message,
      };
    case PAYMENT_RESET:
      return initialState;
    case "FILTER_PRODUCTS_SIMPLE_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        productsLoading: false,
        productsError: null,
      };
    case "FILTER_PRODUCTS_SIMPLE_FAIL":
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload,
      };
    case "BUY_NOW_REQUEST":
      return {
        ...state,
        cartLoading: true,
        cartError: null,
      };
    case "BUY_NOW_SUCCESS":
      const updatedCartItem = { 
        ...action.payload,
        isSelected: action.payload.selected !== null ? action.payload.selected : false, // Ánh xạ selected thành isSelected
      };
      const updatedCartItems = state.cart.cartItems.some((item) => item.id === updatedCartItem.id)
        ? state.cart.cartItems.map((item) => (item.id === updatedCartItem.id ? updatedCartItem : item))
        : [...state.cart.cartItems, updatedCartItem];
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
        cartSummary: calculateCartSummary(updatedCartItems),
        cartLoading: false,
      };
    case "BUY_NOW_FAILURE":
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload,
      };

      case "GET_ORDERS_REQUEST":
      return {
        ...state,
        ordersLoading: true,
        ordersError: null,
      };

    case "GET_ORDERS_SUCCESS":
      return {
        ...state,
        ordersLoading: false,
        orders: action.payload,
        ordersError: null,
      };

    case "GET_ORDERS_FAILURE":
      return {
        ...state,
        ordersLoading: false,
        ordersError: action.payload,
      };
    default:
      return state;
  }
};
