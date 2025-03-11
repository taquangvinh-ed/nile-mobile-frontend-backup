import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/Product/Cart/CartItem";
const Cart = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };
  return (
    <div className="mx-75 my-10">
      <div className="grid grid-cols-3 relative">
        <div className="col-span-2 ">
          {[1, 1, 1, 1].map((item, index) => (
            <CartItem key={index} />
          ))}
        </div>
        <div className="col-span-1 h-[100vh] sticky">
          <div className="border rounded-sm shadow-xl px-3 w-full">
            <p className="font-bold opacity-60 uppercase">
              Thông tin thanh toán
            </p>
            <hr />
            <div className="font-semibold space-y-3">
              <div className="flex justify-between">
                <span className="px-2">Tổng thanh toán (2 sản phẩm): </span>
                <span className="px-1 text-black">32.000.000 VND</span>
              </div>
              <div className="flex justify-between">
                <span className="px-2">Chiết khấu: </span>
                <span className="px-1 text-green-700">7%</span>
              </div>
              <div className="flex justify-between">
                <span className="px-2">Vận chuyển: </span>
                <span className="px-1 text-green-700">Miễn phí</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="px-2">Tổng (2 sản phẩm): </span>
                <span className="px-1 text-green-700">32.000.000 VND</span>
              </div>
              <hr />
            </div>
            <Button
              onClick={() => handleCheckout()}
              variant="contained"
              className="w-full "
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
