import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Auth/Action";
import CartItem from "../../components/Product/Cart/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, cartLoading, cartError, cartSummary } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCart()); // Gọi API khi component được mount
  }, [dispatch]);

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  if (cartLoading) return <div>Loading...</div>;
  if (cartError) return <div>Error: {cartError}</div>;
  if (!cart || !cart.cartItems || cart.cartItems.length === 0) return <div>Giỏ hàng trống</div>;

  return (
    <div className="mx-75 my-10">
      <div className="grid grid-cols-3 relative">
        <div className="col-span-2">
          {cart.cartItems.map((item) => (
            <CartItem key={item.variation.id} item={item} />
          ))}
        </div>
        <div className="col-span-1 h-[100vh] sticky">
          <div className="border rounded-sm shadow-xl px-3 w-full">
            <p className="font-bold opacity-60 uppercase">Thông tin thanh toán</p>
            <hr />
            <div className="font-semibold space-y-3">
              <div className="flex justify-between">
                <span className="px-2">Tổng thanh toán ({cartSummary.totalItems} sản phẩm): </span>
                <span className="px-1 text-black">
                  {cartSummary.subtotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="px-2">Chiết khấu: </span>
                <span className="px-1 text-green-700">
                  {cartSummary.totalDiscount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="px-2">Vận chuyển: </span>
                <span className="px-1 text-green-700">Miễn phí</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="px-2">Tổng ({cartSummary.totalItems} sản phẩm): </span>
                <span className="px-1 text-green-700">
                  {(cartSummary.subtotal - cartSummary.totalDiscount).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </span>
              </div>
              <hr />
            </div>
            <Button
              onClick={handleCheckout}
              variant="contained"
              className="w-full"
              sx={{ px: "2.5rem", marginTop: "1rem", marginBottom: "1rem" }}
            >
              Thanh toán ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;