import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../components/HomeCarosel/MainCarosel";
import HomSection from "../../components/HomeSection/HomSection";
import {
  getThirdLevels,
  getProductsByThirdLevel,
  getSecondLevels,
  getProductsBySecondLevel,
} from "../../../State/Auth/Action";

const HomePage = () => {
  const dispatch = useDispatch();
  const { secondLevels, secondLevelsLoading, secondLevelsError } = useSelector(
    (state) => state.auth
  );
  const [productsBySecondLevel, setProductsBySecondLevel] = useState({});

  useEffect(() => {
    dispatch(getSecondLevels()); // Lấy danh sách thirdLevel
  }, [dispatch]);

  useEffect(() => {
    if (secondLevels.length > 0) {
      secondLevels.forEach((secondLevel) => {
        dispatch(getProductsBySecondLevel(secondLevel)).then((response) => {
          if (response.payload.success) {
            setProductsBySecondLevel((prev) => ({
              ...prev,
              [secondLevel]: response.payload.products,
            }));
          }
        });
      });
    }
  }, [secondLevels, dispatch]);

  if (secondLevelsLoading) return <div>Đang tải...</div>;
  if (secondLevelsError) return <div>Lỗi: {secondLevelsError}</div>;

  return (
    <div className="bg-white bg-opacity-80">
      <div>
        <MainCarousel />
      </div>
      <div className="space-y-10 py-20 flex flex-col justify-center">
        {secondLevels.map((secondLevel) => (
          <HomSection
            key={secondLevel}
            sectionTitle={secondLevel}
            products={productsBySecondLevel[secondLevel] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
