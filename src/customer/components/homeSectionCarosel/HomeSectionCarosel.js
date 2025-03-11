import HomeSectionCard from "../../HomeSection/HomeSectionCard";
import AliceCarousel from "react-alice-carousel";
import { Button } from "@headlessui/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import ProductCard from "../Product/ProductCard";
const responsive = {
  0: { items: 1 },
  720: { items: 3 },
  1024: { items: 5 },
};
const HomSectionCarosel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const slidePrev = () =>
    setActiveItemIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  const slideNext = () =>
    setActiveItemIndex((nextIndex) =>
      nextIndex < items.length - 1 ? nextIndex + 1 : nextIndex
    );

  const renderPrevButton = () => {
    if (activeItemIndex === 0) return null;
    return (
      <Button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50"
        onClick={slidePrev}
      >
        <KeyboardArrowLeftIcon
          fontSize="large"
          style={{
            color: "black",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "50%",
            padding: "10px",
          }}
        />
      </Button>
    );
  };

  const renderNextButton = () => {
    if (activeItemIndex === items.length - 1) return null;
    return (
      <Button
        style={{ height: "50px", width: "50px" }}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-50"
        onClick={slideNext}
      >
        <KeyboardArrowRightIcon
          fontSize="large"
          style={{
            color: "black",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "50%",
            padding: "10px",
          }}
        />
      </Button>
    );
  };

  const items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
    <div className="mx-3">
      <HomeSectionCard />
    </div>
  ));

  // const items = mockProductData.products.map((item) => (
  //   <div>
  //     <ProductCard key={item.id} product={item.product} />
  //   </div>
  // ));

  return (
    <div className="">
      <div className="relative p-5 border border-black">
        <AliceCarousel
          mouseTracking={true}
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          infinite
          disableDotsControls={true}
          disableButtonsControls={false}
          renderPrevButton={renderPrevButton}
          renderNextButton={renderNextButton}
          activeIndex={activeItemIndex}
          onSlideChange={({ item }) => setActiveItemIndex(item)}
        />
      </div>
    </div>
  );
};

export default HomSectionCarosel;
