import { Route, Routes } from "react-router-dom";
// import Checkout from "./customer/components/Checkout/Checkout";
// import Footer from "./customer/components/Footer/Footer";
// import Navigation from "./customer/components/Navigation";
// import Order from "./customer/pages/OrderPage/Order";
// import OrderDetail from "./customer/pages/OrderDetailPage/OrderDetail";
// import Cart from "./customer/pages/CartPage/Cart";
// import Product from "./customer/pages/ProductPage/Product";
// import ProductDetails from "./customer/pages/ProductDetailPage/ProductDetails";
// import HomePage from "./customer/pages/HomePage/HomePage";
import CustomerRouters from "./Routers/CustomerRouters";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
      </Routes>
    </div>
  );
}

export default App;
