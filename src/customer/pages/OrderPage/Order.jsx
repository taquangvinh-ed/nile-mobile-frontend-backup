import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../State/Auth/Action";
import OrderCard from "../../components/Order/OrderCard";

const Order = () => {
  const dispatch = useDispatch();
  const { orders = [], ordersLoading = false, ordersError = null } = useSelector((state) => state.auth);

  const orderStatus = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xác nhận", value: "CONFIRMED" },
    { label: "Đang xử lý", value: "PROCESSING" },
    { label: "Đang giao hàng", value: "SHIPPED" },
    { label: "Đã giao hàng", value: "DELIVERED" },
    { label: "Hoàn thành", value: "COMPLETED" },
    { label: "Hủy", value: "CANCELED" },
    { label: "Hoàn tiền", value: "RETURN_REFUND" },
  ];

  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 5; // Số đơn hàng mỗi trang

  const handleChange = (event) => {
    setStatus(event.target.value);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi trạng thái
  };

  useEffect(() => {
    dispatch(getOrders(status));
  }, [dispatch, status]);

  // Tính toán số trang và dữ liệu hiển thị trên trang hiện tại
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
  };

  return (
    <div className="mx-75 my-7 border rounded-xl shadow-2xl">
      <div className="mx-2 grid grid-cols-1 gap-4">
        <div className="col-span-1">
          <div className="grid grid-cols-7 gap-4">
            <FormControl className="col-span-7">
              <FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={status} onChange={handleChange} className="flex justify-between">
                {orderStatus.map((item) => (
                  <div className="col-span-1" key={item.value}>
                    <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="col-span-1">
          <div className="grid grid-col-1">
            <div className="col-span-1">
              {ordersLoading && <div>Đang tải đơn hàng...</div>}
              {ordersError && <div>Lỗi: {ordersError}</div>}
              {!ordersLoading && !ordersError && orders.length === 0 && <div>Không có đơn hàng nào.</div>}
              {!ordersLoading && !ordersError && currentOrders.map((order) => <OrderCard key={order.id} order={order} />)}
            </div>
          </div>

          {/* Phân trang */}
          {!ordersLoading && !ordersError && orders.length > 0 && (
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {/* Nút "Trang trước" */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                  Trang trước
                </button>

                {/* Danh sách số trang */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  >
                    {page}
                  </button>
                ))}

                {/* Nút "Trang sau" */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                  Trang sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
