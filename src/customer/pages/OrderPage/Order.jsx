import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../State/Auth/Action";
import OrderCard from "../../components/Order/OrderCard";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, ordersLoading, ordersError } = useSelector((state) => state.auth);

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

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    dispatch(getOrders(status));
  }, [dispatch, status]);

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

        {/* searchbar */}
        <div className="col-span-1">
          {/* <form className="max-w-full mx-auto w-full">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tìm kiếm..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form> */}
        </div>

        <div className="col-span-1">
          <div className="grid grid-col-1">
            <div className="col-span-1">
              {ordersLoading && <div>Đang tải đơn hàng...</div>}
              {ordersError && <div>Lỗi: {ordersError}</div>}
              {!ordersLoading && !ordersError && orders.length === 0 && <div>Không có đơn hàng nào.</div>}
              {!ordersLoading && !ordersError && orders.map((order) => <OrderCard key={order.id} order={order} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
