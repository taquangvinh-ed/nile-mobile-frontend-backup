import React from "react";

const ProductPrice = ({ originalPrice, discountPrice, savings }) => {
  return (
    <div className="mt-1">
      <span className=" opacity-60" style={{ textDecoration: "line-through" }}>
        {originalPrice}đ
      </span>{" "}
      <span className="text-red-600 font-semibold">-{savings}%</span>
      <p style={{ fontSize: "1.2rem", color: "red", fontWeight: "bold" }}>
        {discountPrice}đ
      </p>
    </div>
  );
};

export default ProductPrice;
