import React from "react";
import ProductPrice from "../components/Product/ProductPrice";
import ProductFeature from "../components/Product/ProductFeature";
import StarRating from "../components/Product/StarRating";
import Bookmark from "../components/Product/Bookmark";
import DifferenceIcon from "@mui/icons-material/Difference";
import { useNavigate } from "react-router-dom";

const ProductCardSearch = ({ variation, product }) => {
  const navigate = useNavigate();

  // Kiểm tra nếu không có variation
  if (!variation) {
    return (
      <div className="productCard my-4 px-2 w-[15rem] h-[28rem] transition-all mx-1 cursor-pointer border flex flex-col transition-transform duration-200 ease-in-out transform hover:shadow-[rgba(0,0,0,0.16)_0px_10px_36px_0px]">
        <div className="flex justify-center items-center">
          <img src="https://via.placeholder.com/150" alt="No image" className="h-[11rem] w-auto object-cover my-5 transition-transform duration-200 ease-in-out transform hover:scale-110" />
        </div>
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-red-500">Không có biến thể</p>
        </div>
      </div>
    );
  }

  // Định dạng giá
  const formatedPrice = variation.price
    ? variation.price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    : "N/A";

  const formatedDiscountPrice = variation.discountPrice
    ? variation.discountPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    : "N/A";

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)} // Điều hướng đến trang chi tiết sản phẩm
      className="productCard my-4 px-2 w-[15rem] h-[28rem] transition-all mx-1 cursor-pointer border flex flex-col transition-transform duration-200 ease-in-out transform hover:shadow-[rgba(0,0,0,0.16)_0px_10px_36px_0px]"
      style={{ borderRadius: "5%" }}
    >
      <div className="flex justify-center items-center">
        <img
          src={variation.imageURL || "https://via.placeholder.com/150"}
          alt=""
          className="h-[11rem] w-auto object-cover my-5 transition-transform duration-200 ease-in-out transform hover:scale-110"
        />
      </div>
      <div>
        <p className="font-semibold">
          {product.name} {variation.color} {`${variation.ram}/${variation.rom}`}
        </p>
        <ProductFeature screenSize={product.screenSize} batteryCapacity={product.batteryCapacity} />

        {/* Price */}
        <div>
          <ProductPrice originalPrice={formatedPrice} discountPrice={formatedDiscountPrice} savings={variation.discountPercent} />
        </div>
        <div className="flex flex-row justify-between">
          <StarRating rating={4.5} />
          <Bookmark />
        </div>
        <div className="flex justify-center items-center mt-3">
          <button className="text-blue-600 text-[0.9rem]">
            <DifferenceIcon /> So sánh
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSearch;
