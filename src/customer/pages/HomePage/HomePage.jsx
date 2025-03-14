import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarousel from "../../components/HomeCarosel/MainCarosel";
import HomSection from "../../components/HomeSection/HomSection";
import {
  getThirdLevels,
  getProductsByThirdLevel,
} from "../../../State/Auth/Action";

const HomePage = () => {
  const dispatch = useDispatch();
  const { thirdLevels, thirdLevelsLoading, thirdLevelsError } = useSelector(
    (state) => state.auth
  );
  const [productsByThirdLevel, setProductsByThirdLevel] = useState({});

  useEffect(() => {
    dispatch(getThirdLevels()); // Lấy danh sách thirdLevel
  }, [dispatch]);

  useEffect(() => {
    if (thirdLevels.length > 0) {
      thirdLevels.forEach((thirdLevel) => {
        dispatch(getProductsByThirdLevel(thirdLevel)).then((response) => {
          if (response.payload.success) {
            setProductsByThirdLevel((prev) => ({
              ...prev,
              [thirdLevel]: response.payload.products,
            }));
          }
        });
      });
    }
  }, [thirdLevels, dispatch]);

  if (thirdLevelsLoading) return <div>Đang tải...</div>;
  if (thirdLevelsError) return <div>Lỗi: {thirdLevelsError}</div>;

  return (
    <div className="bg-white bg-opacity-80">
      <div>
        <MainCarousel />
      </div>
      <div className="space-y-10 py-20 flex flex-col justify-center">
        {thirdLevels.map((thirdLevel) => (
          <HomSection
            key={thirdLevel}
            sectionTitle={thirdLevel}
            products={productsByThirdLevel[thirdLevel] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
