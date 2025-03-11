import React from "react";
import ProductPrice from "../Product/ProductPrice";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";
const OrderCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/account/order/${5}`);
  };
  return (
    <div onClick={() => handleClick()}>
      <div className="flex justify-between cursor-pointer  border rounded-xl shadow-xl hover:shadow-2xl space-x-5 max-w-auto h-auto px-5 py-3 my-10">
        <div className="flex   w-auto">
          <img
            className="w-[7rem] h-[7rem] object-cover"
            src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739308452/ecommerce/images/product/oxqbtf7gzrlxku2qwbf4.jpg"
            alt="Product Image"
          />
          <div className="flex-grow">
            <div className="font-semibold text-lg">iPhone 16 Pro Max</div>
            <div className="opacity-50 text-md font-semibold">256GB</div>
            <div className="opacity-50 text-md font-semibold">Color: Black</div>
          </div>
          <div className="ml-20 mr-5 flex justify-end items-end">
            <ProductPrice
              originalPrice={"32.990.000"}
              discountPrice={"32.000.000"}
              savings={"7"}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center max-w-[15rem] ">
          {true && (
            <div className="flex flex-row items-center">
              <AdjustIcon sx={{ marginRight: "2rem", color: "green" }} />
              <div className=" flex flex-col">
                <p className="text-sm text-green-700 break-words">
                  Dự kiến giao hàng vào:
                </p>
                <p className="text-sm text-green-700 break-words">
                  Thứ năm, ngày 13 tháng 01 năm 2024
                </p>
              </div>
            </div>
          )}
          {false && (
            <div className="flex flex-row items-center">
              <AdjustIcon sx={{ marginRight: "2rem", color: "green" }} />
              <div className=" flex flex-col">
                <p className="text-sm text-green-700 break-words">
                  Đơn hàng đã được giao vào:
                </p>
                <p className="text-sm text-green-700 break-words">
                  Thứ năm, ngày 13 tháng 01 năm 2024
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
