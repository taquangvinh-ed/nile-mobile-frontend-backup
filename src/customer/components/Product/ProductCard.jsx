import React, { useState } from "react";
import StorageOptionButton from "./StorageOptionButton";
import ProductPrice from "./ProductPrice";
import ProductFeature from "./ProductFeature";
import StarRating from "./StarRating";
import Bookmark from "./Bookmark";
import DifferenceIcon from "@mui/icons-material/Difference";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [selectedButton, setSelectedButton] = useState(product.versions[0]);
  const navigate = useNavigate();

  const handleButtonClick = (version) => {
    setSelectedButton(version);
  };

  return (
    <div
      onClick={() => navigate(`/product/${5}`)}
      className="productCard my-4 px-2 w-[15rem] h-[28rem] transition-all mx-1 cursor-pointer border flex flex-col transition-transform duration-2 ease-in-out transfrom hover:shadow-[rgba(0,0,0,0.16)_0px_10px_36px_0px]"
      style={{ borderRadius: "5%" }}
    >
      <div className="flex justify-center items-center">
        <img
          src={selectedButton.urlImage}
          alt=""
          className=" h-[11rem] w-auto object-cover my-5 transition-transform duration-2 ease-in-out transform hover:scale-110"
        />
      </div>
      <div>
        <p className="font-semibold">
          {product.name} {selectedButton.storage}
        </p>
        <ProductFeature
          resolution={selectedButton.resolution}
          screenSize={selectedButton.screenSize}
          batteryCapacity={selectedButton.batteryCapacity}
        />

        {/* Button */}
        <div className="flex">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {product.versions.map((version, index) => (
              <StorageOptionButton
                key={index}
                label={version.storage}
                isSelected={selectedButton.storage === version.storage}
                onClick={() => handleButtonClick(version)}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <ProductPrice
            originalPrice={selectedButton.originalPrice}
            discountPrice={selectedButton.discountPrice}
            savings={selectedButton.savings}
          />
        </div>
        <div className="flex flex-row justify-between">
          <StarRating rating={selectedButton.starRating} />
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
