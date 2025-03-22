import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCaroselData } from "./MainCaroselData";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};

const items = MainCaroselData.map((item, index) => (
  <img
    key={index}
    className="cursor-pointer h-[300px] w-auto object-cover"
    src={item.image}
    alt={item.alt}
    role="presentation"
  />
));

const MainCarousel = () => {
  const PreviousButton = () => {
    return (
      <button className=" absolute bg-sky-50 top-1/2 left-0 transform -translate-y-1/2 rounded-full">
        <ChevronLeftIcon fontSize="large" />
      </button>
    );
  };

  const NextButton = () => {
    return (
      <button className="absolute bg-sky-100 top-1/2 right-0 transform -translate-y-1/2 rounded-full">
        <ChevronRightIcon fontSize="large" />
      </button>
    );
  };

  return (
    <div className="relative flex justify-start">
      <div className="relative  h-[300px] w-[690px] overflow-hidden">
        <AliceCarousel
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          autoPlay
          autoPlayInterval={3000}
          infinite
          disableDotsControls={true}
          disableButtonsControls={false}
          renderPrevButton={PreviousButton}
          renderNextButton={NextButton}
        />
      </div>
    </div>
  );
};

export default MainCarousel;
