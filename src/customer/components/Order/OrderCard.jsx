import React from "react";
import ProductPrice from "../Product/ProductPrice";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/account/order/${order.id}`);
  };

  // Định dạng ngày giao hàng dự kiến (giao hàng sau 7 ngày từ ngày đặt hàng)
  const estimatedDeliveryDate = new Date(
    order.orderDate[0], // năm
    order.orderDate[1] - 1, // tháng (trừ 1 vì JavaScript đếm từ 0)
    order.orderDate[2], // ngày
    order.orderDate[3], // giờ
    order.orderDate[4], // phút
    order.orderDate[5], // giây
    order.orderDate[6] / 1000000 // mili giây (chia 1 triệu vì nano giây)
  );
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);
  const formattedDeliveryDate = estimatedDeliveryDate.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Định dạng ngày đặt hàng (orderDate) để hiển thị khi đơn hàng đã giao
  const orderDate = new Date(
    order.orderDate[0],
    order.orderDate[1] - 1,
    order.orderDate[2],
    order.orderDate[3],
    order.orderDate[4],
    order.orderDate[5],
    order.orderDate[6] / 1000000
  );
  const formattedOrderDate = orderDate.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Kiểm tra trạng thái đơn hàng
  const isDelivered = order.status === "DELIVERED" || order.status === "COMPLETED";

  // Định dạng địa chỉ giao hàng
  const shippingAddress = order.shippingAddress;
  const formattedAddress = shippingAddress
    ? `${shippingAddress.firstName} ${shippingAddress.lastName}, ${shippingAddress.addressLine}, ${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.province}, ${shippingAddress.phoneNumber}`
    : "Không có địa chỉ giao hàng";

  return (
    <div onClick={handleClick}>
      <div className="cursor-pointer border rounded-xl shadow-xl hover:shadow-2xl space-x-5 max-w-auto h-auto px-5 py-3 my-10">
        {/* Hiển thị tất cả sản phẩm trong orderDetails */}
        <div className="flex flex-col space-y-4">
          {order.orderDetails && order.orderDetails.length > 0 ? (
            order.orderDetails.map((detail, index) => (
              <div key={index} className="flex w-auto">
                <img
                  className="w-[7rem] h-[7rem] object-cover"
                  src={detail.imageURL || "https://via.placeholder.com/150"}
                  alt={`Product Image ${index + 1}`}
                />
                <div className="flex-grow ml-4">
                  <div className="font-semibold text-lg">
                    {detail.variationName || "Unknown Product"}
                  </div>
                  <div className="opacity-50 text-md font-semibold">
                    Số lượng: {detail.quantity}
                  </div>
                  <div className="text-md font-semibold">
                    Giá: {detail.subtotal.toLocaleString("vi-VN")} VNĐ
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Không có sản phẩm trong đơn hàng.</div>
          )}
        </div>

        {/* Hiển thị địa chỉ giao hàng */}
        <div className="mt-4">
          <p className="text-sm font-semibold">Địa chỉ giao hàng:</p>
          <p className="text-sm text-gray-700 break-words">{formattedAddress}</p>
        </div>

        {/* Hiển thị tổng giá và trạng thái giao hàng */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex justify-end items-end">
            <ProductPrice
              originalPrice={order.totalPrice.toLocaleString("vi-VN")}
              discountPrice={order.totalDiscountPrice.toLocaleString("vi-VN")}
              savings={
                order.totalPrice > 0
                  ? Math.round(
                      ((order.totalPrice - order.totalDiscountPrice) / order.totalPrice) * 100
                    )
                  : 0
              }
            />
          </div>
          <div className="flex flex-wrap items-center max-w-[15rem]">
            {!isDelivered && (
              <div className="flex flex-row items-center">
                <AdjustIcon sx={{ marginRight: "2rem", color: "green" }} />
                <div className="flex flex-col">
                  <p className="text-sm text-green-700 break-words">Dự kiến giao hàng vào:</p>
                  <p className="text-sm text-green-700 break-words">{formattedDeliveryDate}</p>
                </div>
              </div>
            )}
            {isDelivered && (
              <div className="flex flex-row items-center">
                <AdjustIcon sx={{ marginRight: "2rem", color: "green" }} />
                <div className="flex flex-col">
                  <p className="text-sm text-green-700 break-words">Đơn hàng đã được giao vào:</p>
                  <p className="text-sm text-green-700 break-words">{formattedOrderDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;