import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, addToCart } from "../../../State/Auth/Action"; // Thêm addToCart
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarRating from "../../components/Product/StarRating";
import ProductPrice from "../../components/Product/ProductPrice";
import ProductReviewCard from "../../components/ProductDetail/ProductReviewCard";
import { Box, LinearProgress, Rating } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import mockProductData from "../../components/Product/mockProductData";
import ProductCard from "../../components/Product/ProductCard";
import InputPersionalnfor from "../../components/ProductDetail/InputPersionalnfor";
import ProductDetailPopup from "./ProductDetailPopup";
import AuthModal from "../../../AuthModal/AuthModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    productDetails,
    loading,
    error,
    isAuthenticated,
    cartLoading,
    cartError,
  } = useSelector((state) => state.auth);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log("Dispatching getProductDetails with productId:", productId);
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    console.log("productDetails updated:", productDetails);
    if (
      productDetails &&
      productDetails.variations &&
      productDetails.variations.length > 0
    ) {
      setSelectedVariation(productDetails.variations[0]);
    }
  }, [productDetails]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!selectedVariation) {
      alert("Please select a variation before adding to cart.");
      return;
    }

    try {
      const result = await dispatch(addToCart(selectedVariation));
      if (result.payload.success) {
        alert("Thêm sản phẩm vào giỏ hàng thành công!");
        navigate("/cart");
      } else {
        alert("Failed to add to cart: " + result.payload.error);
      }
    } catch (err) {
      alert("An error occurred: " + cartError);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!productDetails) return <div>No product found</div>;

  const formatedPrice =
    selectedVariation?.price?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }) || "N/A";
  const formatedDiscountPrice =
    selectedVariation?.discountPrice?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }) || "N/A";

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                  {productDetails.categoryName || "Category"}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productDetails.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="mx-75 grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-10 pr-4 pt-10">
          {/* Image gallery - Carousel */}
          <div className="flex flex-col items-center w-[40rem] h-[30rem]">
            <div className="overflow-hidden rounded-lg max-w-[40rem] max-h-[25rem] mb-4">
              <img
                alt={selectedVariation?.imageURL ? "Product Image" : ""}
                src={selectedVariation?.imageURL || productDetails.imageURL}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2 justify-center overflow-x-auto">
              {productDetails.variations.map((variation, index) => (
                <div
                  key={index}
                  className={`aspect-h-1 aspect-w-1 overflow-hidden rounded-lg max-w-[4rem] max-h-[4rem] cursor-pointer ${
                    index === currentImageIndex
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedVariation(variation);
                    handleThumbnailClick(index);
                  }}
                >
                  <img
                    alt={variation.imageURL ? "Variation Image" : ""}
                    src={variation.imageURL}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="border shadow-2xl lg:col-span-1 max-auto max-w-2xl px-2 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 ml-20">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-lg lg:text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {productDetails.name}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="text-3xl tracking-tight text-gray-900">
                <ProductPrice
                  originalPrice={formatedPrice}
                  discountPrice={formatedDiscountPrice}
                  savings={selectedVariation?.discountPercent}
                />
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <StarRating rating={4.5} />
                    <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      <span>100</span> lượt đánh giá
                    </p>
                  </div>
                </div>
              </div>

              <form className="mt-10">
                <div>
                  <h3 className="text-md font-medium text-gray-900">Màu sắc</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedVariation}
                      onChange={setSelectedVariation}
                      className="flex items-center gap-x-3"
                    >
                      {productDetails.variations.map((variation) => (
                        <Radio
                          key={variation.id}
                          value={variation}
                          aria-label={variation.color}
                          className={classNames(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                          )}
                        >
                          <div className="flex justify-center items-center mx-2">
                            <span
                              aria-hidden="true"
                              className={`size-8 rounded-full border border-black/10`}
                              style={{ backgroundColor: variation.color }}
                            />
                            <span className="mx-1">
                              {variation.color} <br />
                              <span className="font-semibold">
                                {variation.ram} - {variation.rom}
                              </span>
                            </span>
                          </div>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <div className="flex flex-col my-8">
                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-bold text-white hover:bg-red-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                  >
                    MUA NGAY
                  </button>
                  <button
                    onClick={handleAddToCart}
                    type="button" // Đổi thành type="button" để tránh submit form
                    disabled={cartLoading} // Vô hiệu hóa khi đang gọi API
                    className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-400"
                  >
                    {cartLoading ? "Đang thêm..." : "Thêm vào giỏ hàng"}{" "}
                    <AddShoppingCartIcon />
                  </button>
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {productDetails.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Điểm nổi bật
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Kích thước màn hình: {productDetails.screenSize}"
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Dung lượng pin: {productDetails.batteryCapacity} mAh
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Hệ điều hành: {productDetails.os}
                      </span>
                    </li>
                  </ul>
                  <div>
                    <ProductDetailPopup
                      product={productDetails}
                      variation={selectedVariation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-75 mt-10 flex flex-col items-start">
          <h1 className="text-2xl font-semibold">
            Đánh giá {productDetails.name}
          </h1>
          <div className="border p-5 rounded-lg shadow-2xl">
            <div className="grid grid-cols-12 gap-7">
              <div className="col-span-7">
                <InputPersionalnfor rating={false} />
              </div>
              <div className="col-span-7">
                <div className="space-y-5">
                  {[1, 1, 1, 1, 1].map((index) => (
                    <ProductReviewCard key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
