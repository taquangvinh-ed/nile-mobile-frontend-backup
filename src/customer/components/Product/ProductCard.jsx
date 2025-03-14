import React, { useState } from "react";
import StorageOptionButton from "./StorageOptionButton";
import ProductPrice from "./ProductPrice";
import ProductFeature from "./ProductFeature";
import StarRating from "./StarRating";
import Bookmark from "./Bookmark";
import DifferenceIcon from "@mui/icons-material/Difference";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [selectedButton, setSelectedButton] = useState(
    product.variations && product.variations.length > 0
      ? product.variations[0]
      : null
  );
  const navigate = useNavigate();

  const handleButtonClick = (version, event) => {
    event.stopPropagation();
    setSelectedButton(version);
  };

  const formatedPrice = selectedButton.price
    ? selectedButton.price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    : "N/A";

  const formatedDiscountPrice = selectedButton.discountPrice
    ? selectedButton.discountPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    : "N/A";

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="productCard my-4 px-2 w-[15rem] h-[28rem] transition-all mx-1 cursor-pointer border flex flex-col transition-transform duration-200 ease-in-out transform hover:shadow-[rgba(0,0,0,0.16)_0px_10px_36px_0px]"
      style={{ borderRadius: "5%" }}
    >
      <div className="flex justify-center items-center">
        <img
          src={selectedButton.imageURL}
          alt=""
          className=" h-[11rem] w-auto object-cover my-5 transition-transform duration-200 ease-in-out transform hover:scale-110"
        />
      </div>
      <div>
        <p className="font-semibold">
          {product.name} {`${selectedButton.ram}/${selectedButton.rom}`}
        </p>
        <ProductFeature
          screenSize={product.screenSize}
          batteryCapacity={product.batteryCapacity}
        />

        {/* Button */}
        <div className="flex">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {product.variations.map((version, index) => (
              <StorageOptionButton
                key={index}
                label={`${version.ram}/${version.rom}`}
                isSelected={
                  `${selectedButton.ram}/${selectedButton.rom}` ===
                  `${version.ram}/${version.rom}`
                }
                onClick={(event) => handleButtonClick(version, event)}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <ProductPrice
            originalPrice={formatedPrice}
            discountPrice={formatedDiscountPrice}
            savings={selectedButton.discountPercent}
          />
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

export default ProductCard;
