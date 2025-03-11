import React from "react";

const ProductFeature = ({ resolution, screenSize, batteryCapacity }) => {
  return (
    <div className="flex flex-wrap justify-start">
      <span className=" my-1 mr-1 px-1 text-[0.6rem] lg:text-[0.8rem] bg-slate-300 rounded-sm">
        {resolution}
      </span>
      <span className=" my-1 mr-1 text-[0.8rem] bg-slate-300 rounded-sm">
        {screenSize} inches
      </span>
      <span className="my-1 mr-1 text-[0.8rem] bg-slate-300 rounded-sm">
        {batteryCapacity} mAh
      </span>
    </div>
  );
};

export default ProductFeature;
