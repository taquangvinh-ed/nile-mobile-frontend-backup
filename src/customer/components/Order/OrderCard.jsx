import React from "react";
import ProductPrice from "../Product/ProductPrice";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/account/order/${order.id}`);
  };

  // Lấy thông tin sản phẩm đầu tiên trong orderDetails để hiển thị
  const firstOrderDetail = order.orderDetails && order.orderDetails.length > 0 ? order.orderDetails[0] : null;

  // Định dạng ngày giao hàng dự kiến (giả sử giao hàng sau 3 ngày từ ngày đặt hàng)
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

  // Kiểm tra trạng thái đơn hàng
  const isDelivered = order.status === "DELIVERED" || order.status === "COMPLETED";

  return (
    <div onClick={handleClick}>
      <div className="flex justify-between cursor-pointer border rounded-xl shadow-xl hover:shadow-2xl space-x-5 max-w-auto h-auto px-5 py-3 my-10">
        <div className="flex w-auto">
          <img
            className="w-[7rem] h-[7rem] object-cover"
            src={firstOrderDetail?.variation?.imageURL || "https://via.placeholder.com/150"}
            alt="Product Image"
          />
          <div className="flex-grow">
            <div className="font-semibold text-lg">{firstOrderDetail?.variation?.name || "Unknown Product"}</div>
            <div className="opacity-50 text-md font-semibold">{firstOrderDetail?.variation?.color || "Unknown Color"}</div>
          </div>
          <div className="ml-20 mr-5 flex justify-end items-end">
            <ProductPrice
              originalPrice={order.totalPrice.toLocaleString("vi-VN")}
              discountPrice={order.totalDiscountPrice.toLocaleString("vi-VN")}
              savings={order.totalPrice > 0 ? Math.round(((order.totalPrice - order.totalDiscountPrice) / order.totalPrice) * 100) : 0}
            />
          </div>
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
                <p className="text-sm text-green-700 break-words">{new Date(order.createAt).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;