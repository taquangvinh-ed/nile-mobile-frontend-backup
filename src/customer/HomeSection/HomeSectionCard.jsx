import React from "react";

function HomeSectionCard() {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg overflow-hidden w-[13rem] shadow-lg border border-black ">
      <div className="h-[15rem] w-[12rem]">
        <img
          className="object-cover object-top w-full h-full"
          src="https://res.cloudinary.com/dwif85oqc/image/upload/v1738917619/ecommerce/images/home/sectionCarousel/payonwdqfjflrvk2xsec.webp"
          alt="Samsung Galaxy S25 Ultra"
        />
      </div>
      <div>
        <h3 className="font-bold">Samsung Galaxy S25 Ultra</h3>
        <h3 className="font-bold text-red-600">23.350.000</h3>
      </div>
    </div>
  );
}

export default HomeSectionCard;
