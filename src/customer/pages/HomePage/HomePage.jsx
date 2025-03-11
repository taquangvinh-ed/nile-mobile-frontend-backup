import React from "react";
import MainCarousel from "../../components/HomeCarosel/MainCarosel";
import HomSection from "../../components/HomeSection/HomSection";
import HomeSectionCard from "../../HomeSection/HomeSectionCard";
import HomSectsionCarosel from "../../components/homeSectionCarosel/HomeSectionCarosel";
const HomePage = () => {
  return (
    <div className="bg-white bg-opacity-80">
      <div>
        <MainCarousel />
      </div>
      <div className="space-y-10 py-20 flex flex-col justify-center">
        {/* <HomSectionCarosel /> */}
        <HomSection sectionTitle={"SẢN PHẨM ĐÃ XEM"} />
        <HomSection sectionTitle={"iPhone"} />
        <HomSection sectionTitle={"Samsung"} />
        <HomSection sectionTitle={"Xiaomi"} />
        <HomSection sectionTitle={"OPPO"} />
      </div>
    </div>
  );
};

export default HomePage;
