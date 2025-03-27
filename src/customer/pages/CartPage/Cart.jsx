import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getCart, getUser } from "../../../State/Auth/Action";
import CartItem from "../../components/Product/Cart/CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, cartLoading, cartError, cartSummary, user, order, orderLoading, orderError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCart());
    if (!user) {
      dispatch(getUser());
    } // Gọi API khi component được mount
  }, [dispatch, user]);

  const handleCheckout = () => {
    if (!user || !user.id) {
      console.error("User is null or user.id is undefined:", user);
      alert("Thông tin người dùng chưa được tải. Vui lòng thử lại!");
      dispatch(getUser()); // Thử tải lại user
      return;
    }

    const selectedItems = cart.cartItems.filter((item) => item.isSelected);
    if (!selectedItems || selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    // Tạo order mà không cần shippingAddress ban đầu
    dispatch(createOrder(user.id, null, selectedItems)).then((result) => {
      if (result.payload.success) {
        const orderId = result.payload.order.id; // Giả định order trả về có id
        if (!result.payload.order.shippingAddress) {
          // Nếu chưa có shippingAddress, chuyển đến bước xác nhận địa chỉ
          navigate(`/checkout?step=3&orderId=${orderId}`);
        } else {
          // Nếu đã có, chuyển đến bước thanh toán
          navigate("/checkout?step=4");
        }
      } else {
        alert("Lỗi khi tạo đơn hàng: " + result.payload.error);
      }
    });
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
                  {cartSummary.subtotal.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="px-2">Chiết khấu: </span>
                <span className="px-1 text-green-700">
                  {cartSummary.totalDiscount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
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
                  {(cartSummary.subtotal - cartSummary.totalDiscount).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <hr />
            </div>
            <Button onClick={handleCheckout} variant="contained" className="w-full" sx={{ px: "2.5rem", marginTop: "1rem", marginBottom: "1rem" }}>
              Thanh toán ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
