// OrderDetails.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Auth/Action"; // Action mới để lấy chi tiết đơn hàng

const OrderDetails2 = () => {
  const { id } = useParams(); // Lấy id từ URL
  const dispatch = useDispatch();
  const { order, orderLoading, orderError } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (id && !isNaN(id)) {
      dispatch(getOrderById(id)); // Gọi API để lấy chi tiết đơn hàng
    }
  }, [dispatch, id]);

  if (orderLoading) return <div>Đang tải chi tiết đơn hàng...</div>;
  if (orderError) return <div>Lỗi: {orderError}</div>;
  if (!order) return <div>Không tìm thấy đơn hàng.</div>;

  return (
    <div className="mx-75 my-7 border rounded-xl shadow-2xl p-4">
      <h1>Chi tiết đơn hàng #{order.id}</h1>
      <p>Ngày đặt hàng: {new Date(order.orderDate).toLocaleDateString("vi-VN")}</p>
      <p>Tổng giá: {order.totalPrice.toLocaleString("vi-VN")} VNĐ</p>
      <p>Giá sau giảm: {order.totalDiscountPrice.toLocaleString("vi-VN")} VNĐ</p>
      <p>Trạng thái: {order.status}</p>
      <h2>Sản phẩm trong đơn hàng:</h2>
      {order.orderDetails && order.orderDetails.length > 0 ? (
        order.orderDetails.map((detail) => (
          <div key={detail.id} className="border p-2 mb-2">
            <p>Tên sản phẩm: {detail.variation?.name || "Unknown Product"}</p>
            <p>Màu sắc: {detail.variation?.color || "Unknown"}</p>
            <p>Số lượng: {detail.quantity}</p>
            <p>Tổng phụ: {detail.subtotal.toLocaleString("vi-VN")} VNĐ</p>
          </div>
        ))
      ) : (
        <p>Không có sản phẩm trong đơn hàng.</p>
      )}
    </div>
  );
};

export default OrderDetails2;