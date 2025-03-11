import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const OrderTraker = ({ activeStep }) => {
  const steps = [
    "Đơn hàng đã đặt",
    "Đã xác nhận thông tin thanh toán",
    "Đã giao cho đơn vị vận chuyển",
    "Đã nhận được hàng",
    "Đánh giá",
  ];
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTraker;
