import React from "react";
import Navigation from "../customer/components/Navigation";
import { Route, Routes } from "react-router-dom";
import HomePage from "../customer/pages/HomePage/HomePage";
import Cart from "../customer/pages/CartPage/Cart";
import Footer from "../customer/components/Footer/Footer";
import ProductDetails from "../customer/pages/ProductDetailPage/ProductDetails";
import Order from "../customer/pages/OrderPage/Order";
import OrderDetail from "../customer/pages/OrderDetailPage/OrderDetail";
import Checkout from "../customer/components/Checkout/Checkout";
import Product from "../customer/pages/ProductPage/Product";
import LoginForm from "../customer/pages/LoginPage/Login";
import RegisterForm from "../customer/pages/RegisterPage/RegisterForm";
import UserProfile from "../customer/pages/UserProfilePage/UserProfile";
import OrderSummary from "../customer/components/Checkout/OrderSummary";
import CallbackVNPay from "../customer/pages/CallbackVNPAY/CallbackVNPay";
const CustomerRouters = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/account/order" element={<Order />}></Route>
        <Route path="/account/order/:orderId" element={<OrderDetail />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/userProfile" element={<UserProfile />}></Route>
        <Route path="/payment-callback" element={<CallbackVNPay />}></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
