import React from "react";
import AddressCard from "../../components/AddressCard/AddressCard";
import OrderTraker from "../../components/Order/OrderTraker";

const OrderDetail = () => {
  return (
    <div className="mx-75">
      <div>
        <h1 className="font-semibold text-lg py-7">Địa chỉ giao hàng</h1>
        <AddressCard />
      </div>
      <div className="flex justify-between items-center my-5 px-7 py-7">
        <OrderTraker activeStep={2} />
      </div>
    </div>
  );
};

export default OrderDetail;
