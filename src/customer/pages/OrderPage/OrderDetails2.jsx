import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../State/Auth/Action";
import { ArrowLeftIcon, CalendarIcon, TruckIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"; // Sử dụng Heroicons
import { Button } from "@mui/material";

const OrderDetails2 = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, orderLoading, orderError } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (id && !isNaN(id)) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  if (orderLoading) return <div className="text-center text-gray-500">Đang tải chi tiết đơn hàng...</div>;
  if (orderError) return <div className="text-center text-red-500">Lỗi: {orderError}</div>;
  if (!order) return <div className="text-center text-gray-500">Không tìm thấy đơn hàng.</div>;

  // Định dạng ngày đặt hàng từ mảng orderDate
  const orderDate = new Date(order.orderDate[0], order.orderDate[1] - 1, order.orderDate[2], order.orderDate[3], order.orderDate[4], order.orderDate[5], order.orderDate[6] / 1000000);
  const formattedOrderDate = orderDate.toLocaleString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Định dạng ngày giao hàng dự kiến (7 ngày sau ngày đặt hàng)
  const estimatedDeliveryDate = new Date(orderDate);
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);
  const formattedDeliveryDate = estimatedDeliveryDate.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Định dạng địa chỉ giao hàng
  const shippingAddress = order.shippingAddress;
  const formattedAddress = shippingAddress
    ? `${shippingAddress.firstName} ${shippingAddress.lastName}, ${shippingAddress.addressLine}, ${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.province}, ${shippingAddress.phoneNumber}`
    : "Không có địa chỉ giao hàng";

  // Kiểm tra trạng thái đơn hàng để hiển thị màu sắc
  const statusColor =
    order.status === "DELIVERED" || order.status === "COMPLETED"
      ? "bg-green-100 text-green-800"
      : order.status === "CANCELED" || order.status === "RETURN_REFUND"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white border rounded-xl shadow-2xl">
      {/* Tiêu đề và nút quay lại */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate("/account/order")} className="mr-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Chi tiết đơn hàng #{order.id}</h1>
        </div>
      </div>

      {/* Thông tin đơn hàng */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex items-center mb-4">
          <CalendarIcon className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-700">Thông tin đơn hàng</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Ngày đặt hàng:</strong> {formattedOrderDate}
          </p>
          <p>
            <strong>Tổng giá:</strong> <span className="text-gray-800 font-medium">{order.totalPrice.toLocaleString("vi-VN")} VNĐ</span>
          </p>
          <p>
            <strong>Giá sau giảm:</strong> <span className="text-green-600 font-medium">{order.totalDiscountPrice.toLocaleString("vi-VN")} VNĐ</span>
          </p>
          <p>
            <strong>Tiết kiệm:</strong>{" "}
            <span className="text-blue-600 font-medium">{order.totalPrice > 0 ? Math.round(((order.totalPrice - order.totalDiscountPrice) / order.totalPrice) * 100) : 0}%</span>
          </p>
          <p>
            <strong>Tổng số sản phẩm:</strong> {order.totalItem}
          </p>
          <p>
            <strong>Trạng thái:</strong> <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>{order.status}</span>
          </p>
          <p>
            <strong>ID người dùng:</strong> {order.userId}
          </p>
          {order.status !== "DELIVERED" && order.status !== "COMPLETED" && (
            <p>
              <strong>Dự kiến giao hàng:</strong> {formattedDeliveryDate}
            </p>
          )}
        </div>
      </div>

      {/* Địa chỉ giao hàng */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex items-center mb-4">
          <TruckIcon className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-700">Địa chỉ giao hàng</h2>
        </div>
        <p className={shippingAddress ? "text-gray-800" : "text-gray-500 italic"}>{formattedAddress}</p>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex items-center mb-4">
          <ShoppingBagIcon className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-700">Sản phẩm trong đơn hàng</h2>
        </div>
        {order.orderDetails && order.orderDetails.length > 0 ? (
          order.orderDetails.map((detail) => (
            <div key={detail.id} className="flex items-center p-4 mb-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
              {/* Hình ảnh sản phẩm */}
              <img className="w-24 h-24 object-cover rounded-lg mr-4" src={detail.imageURL || "https://via.placeholder.com/150"} alt={`Product Image ${detail.id}`} />
              {/* Thông tin sản phẩm */}
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800">{detail.variationName || "Unknown Product"}</p>
                <p className="text-sm text-gray-600">
                  <strong>ID biến thể:</strong> {detail.variationId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Số lượng:</strong> {detail.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Tổng phụ:</strong> <span className="text-gray-800">{detail.subtotal.toLocaleString("vi-VN")} VNĐ</span>
                </p>
                {detail.totalDiscountPrice !== null && (
                  <p className="text-sm text-gray-600">
                    <strong>Giá sau giảm (sản phẩm):</strong> <span className="text-green-600">{detail.totalDiscountPrice.toLocaleString("vi-VN")} VNĐ</span>
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Không có sản phẩm trong đơn hàng.</p>
        )}
      </div>
      <Button onClick={() => navigate("/")}>Quay về trang chủ</Button>
    </div>
  );
};

export default OrderDetails2;
