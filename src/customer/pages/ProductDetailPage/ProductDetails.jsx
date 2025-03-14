// "use client";

// import { useState } from "react";
// import { StarIcon } from "@heroicons/react/20/solid";
// import { Radio, RadioGroup } from "@headlessui/react";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import StarRating from "../../components/Product/StarRating";
// import ProductPrice from "../../components/Product/ProductPrice";
// import InputPersionalnfor from "../../components/ProductDetail/InputPersionalnfor";
// import Grid from "@mui/material/Grid";
// import ProductReviewCard from "../../components/ProductDetail/ProductReviewCard";
// import { Box, LinearProgress, Rating } from "@mui/material";
// import StarRateIcon from "@mui/icons-material/StarRate";
// import mockProductData from "../../components/Product/mockProductData";
// import ProductCard from "../../components/Product/ProductCard";
// import { useNavigate } from "react-router-dom";

// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "$192",
//   href: "#",
//   breadcrumbs: [
//     { id: 1, name: "Men", href: "#" },
//     { id: 2, name: "Clothing", href: "#" },
//   ],
//   images: [
//     {
//       src: "https://res.cloudinary.com/dwif85oqc/image/upload/v1739308452/ecommerce/images/product/oxqbtf7gzrlxku2qwbf4.jpg",
//       alt: "Two each of gray, white, and black shirts laying flat.",
//     },
//     {
//       src: "https://res.cloudinary.com/dwif85oqc/image/upload/v1739308452/ecommerce/images/product/oxqbtf7gzrlxku2qwbf4.jpg",
//       alt: "Model wearing plain black basic tee.",
//     },
//     {
//       src: "https://res.cloudinary.com/dwif85oqc/image/upload/v1739308452/ecommerce/images/product/oxqbtf7gzrlxku2qwbf4.jpg",
//       alt: "Model wearing plain gray basic tee.",
//     },
//     {
//       src: "https://res.cloudinary.com/dwif85oqc/image/upload/v1739308452/ecommerce/images/product/oxqbtf7gzrlxku2qwbf4.jpg",
//       alt: "Model wearing plain white basic tee.",
//     },
//   ],
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "XXS", inStock: false },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "2XL", inStock: true },
//     { name: "3XL", inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     "Hand cut and sewn locally",
//     "Dyed with our proprietary colors",
//     "Pre-washed & pre-shrunk",
//     "Ultra-soft 100% cotton",
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// };
// const reviews = { href: "#", average: 4, totalCount: 117 };

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetails() {
//   const [selectedColor, setSelectedColor] = useState(product.colors[0]);
//   const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0); // Thêm state để quản lý ảnh hiện tại
//   const navigate = useNavigate();
//   const handleAddToCart = () => {
//     navigate("/cart");
//   };

//   // Hàm chuyển ảnh khi nhấp vào ảnh nhỏ
//   const handleThumbnailClick = (index) => {
//     setCurrentImageIndex(index);
//   };

//   return (
//     <div className="bg-white">
//       <div className="pt-6">
//         <nav aria-label="Breadcrumb">
//           <ol
//             role="list"
//             className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
//           >
//             {product.breadcrumbs.map((breadcrumb) => (
//               <li key={breadcrumb.id}>
//                 <div className="flex items-center">
//                   <a
//                     href={breadcrumb.href}
//                     className="mr-2 text-sm font-medium text-gray-900"
//                   >
//                     {breadcrumb.name}
//                   </a>
//                   <svg
//                     fill="currentColor"
//                     width={16}
//                     height={20}
//                     viewBox="0 0 16 20"
//                     aria-hidden="true"
//                     className="h-5 w-4 text-gray-300"
//                   >
//                     <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                   </svg>
//                 </div>
//               </li>
//             ))}
//             <li className="text-sm">
//               <a
//                 href={product.href}
//                 aria-current="page"
//                 className="font-medium text-gray-500 hover:text-gray-600"
//               >
//                 {product.name}
//               </a>
//             </li>
//           </ol>
//         </nav>

//         <section className="mx-75 grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-10 pr-4 pt-10">
//           {/* Image gallery - Carousel */}
//           <div className="flex flex-col items-center w-[40rem] h-[30rem]">
//             {/* Ảnh lớn */}
//             <div className="overflow-hidden rounded-lg max-w-[40rem] max-h-[25rem] mb-4">
//               <img
//                 alt={product.images[currentImageIndex].alt}
//                 src={product.images[currentImageIndex].src}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             {/* Thanh ảnh nhỏ (thumbnails) */}
//             <div className="flex space-x-2 justify-center overflow-x-auto">
//               {product.images.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`aspect-h-1 aspect-w-1 overflow-hidden rounded-lg max-w-[4rem] max-h-[4rem] cursor-pointer ${
//                     index === currentImageIndex
//                       ? "border-2 border-blue-500"
//                       : ""
//                   }`}
//                   onClick={() => handleThumbnailClick(index)}
//                 >
//                   <img
//                     alt={item.alt}
//                     src={item.src}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Product info */}
//           <div className="lg:col-span-1 max-auto max-w-2xl px-2 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 ml-20">
//             <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//               <h1 className="text-lg lg:text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//                 {product.name}
//               </h1>
//             </div>

//             {/* Options */}
//             <div className="mt-4 lg:row-span-3 lg:mt-0">
//               <h2 className="sr-only">Product information</h2>
//               <div className="text-3xl tracking-tight text-gray-900">
//                 <ProductPrice
//                   originalPrice={"34.900.000"}
//                   discountPrice={"34.000.000"}
//                   savings={6}
//                 />
//               </div>

//               {/* Reviews */}
//               <div className="mt-6">
//                 <h3 className="sr-only">Reviews</h3>
//                 <div className="flex items-center">
//                   <div className="flex items-center">
//                     <StarRating rating={4} />

//                     <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                       <span>589</span> lượt đánh giá
//                     </p>
//                   </div>
//                   <p className="sr-only">{reviews.average} out of 5 stars</p>
//                   <a
//                     href={reviews.href}
//                     className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
//                   >
//                     {reviews.totalCount} lượt xem
//                   </a>
//                 </div>
//               </div>

//               <form className="mt-10">
//                 {/* Colors */}
//                 <div>
//                   <h3 className="text-md font-medium text-gray-900">Màu sắc</h3>

//                   <fieldset aria-label="Choose a color" className="mt-4">
//                     <RadioGroup
//                       value={selectedColor}
//                       onChange={setSelectedColor}
//                       className="flex items-center gap-x-3"
//                     >
//                       {product.colors.map((color) => (
//                         <Radio
//                           key={color.name}
//                           value={color}
//                           aria-label={color.name}
//                           className={classNames(
//                             color.selectedClass,
//                             "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
//                           )}
//                         >
//                           <div className="flex justify-center items-center mx-2">
//                             <span
//                               aria-hidden="true"
//                               className={classNames(
//                                 color.class,
//                                 "size-8 rounded-full border border-black/10"
//                               )}
//                             />
//                             <span className="mx-1"> {color.name}</span>
//                           </div>
//                         </Radio>
//                       ))}
//                     </RadioGroup>
//                   </fieldset>
//                 </div>

//                 {/* Sizes */}
//                 <div className="mt-10">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-sm font-medium text-gray-900">Size</h3>
//                     <a
//                       href="#"
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//                     >
//                       Size guide
//                     </a>
//                   </div>

//                   <fieldset aria-label="Choose a size" className="mt-4">
//                     <RadioGroup
//                       value={selectedSize}
//                       onChange={setSelectedSize}
//                       className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
//                     >
//                       {product.sizes.map((size) => (
//                         <Radio
//                           key={size.name}
//                           value={size}
//                           disabled={!size.inStock}
//                           className={classNames(
//                             size.inStock
//                               ? "cursor-pointer bg-white text-gray-900 shadow-xs"
//                               : "cursor-not-allowed bg-gray-50 text-gray-200",
//                             "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
//                           )}
//                         >
//                           <span>{size.name}</span>
//                           {size.inStock ? (
//                             <span
//                               aria-hidden="true"
//                               className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
//                             />
//                           ) : (
//                             <span
//                               aria-hidden="true"
//                               className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
//                             >
//                               <svg
//                                 stroke="currentColor"
//                                 viewBox="0 0 100 100"
//                                 preserveAspectRatio="none"
//                                 className="absolute inset-0 size-full stroke-2 text-gray-200"
//                               >
//                                 <line
//                                   x1={0}
//                                   x2={100}
//                                   y1={100}
//                                   y2={0}
//                                   vectorEffect="non-scaling-stroke"
//                                 />
//                               </svg>
//                             </span>
//                           )}
//                         </Radio>
//                       ))}
//                     </RadioGroup>
//                   </fieldset>
//                 </div>
//                 <div className="flex flex-col my-8">
//                   <button
//                     type="submit"
//                     className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-bold text-white hover:bg-red-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
//                   >
//                     MUA NGAY
//                   </button>
//                   <button
//                     onClick={() => handleAddToCart()}
//                     type="submit"
//                     className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
//                   >
//                     Thêm vào giỏ hàng <AddShoppingCartIcon />
//                   </button>
//                 </div>
//               </form>
//             </div>

//             <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
//               {/* Description and details */}
//               <div>
//                 <h3 className="sr-only">Description</h3>

//                 <div className="space-y-6">
//                   <p className="text-base text-gray-900">
//                     {product.description}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-10">
//                 <h3 className="text-sm font-medium text-gray-900">
//                   Highlights
//                 </h3>

//                 <div className="mt-4">
//                   <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
//                     {product.highlights.map((highlight) => (
//                       <li key={highlight} className="text-gray-400">
//                         <span className="text-gray-600">{highlight}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="mt-10">
//                 <h2 className="text-sm font-medium text-gray-900">Details</h2>

//                 <div className="mt-4 space-y-6">
//                   <p className="text-sm text-gray-600">{product.details}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="mx-75 my-5 pt-5">
//           <div className="flex flex-col items-start">
//             <div className="flex justify-between border border-b-none shadow-2xl rounded-tl-lg rounded-tr-[70px] mb-0">
//               <h1 className="text-2xl font-semibold">
//                 Đánh giá {product.name}
//               </h1>
//               <div className="flex mx-7 justify-center items-center">
//                 <Rating value={4.6} readOnly precision={0.1} />
//                 <p>4.6/10 lượt đánh giá</p>
//               </div>
//             </div>
//             <div className="mt-0 border p-5 rounded-lg rounded-tl-none shadow-2xl">
//               <div className="w-full">
//                 <Box className="flex justify-center mb-10">
//                   <div>
//                     <div className="grid gap-x-0.1 grid-cols-12 items-center">
//                       <div className="col-span-2">
//                         <p className="flex justify-center">
//                           <Rating value={5} readOnly />
//                         </p>
//                       </div>
//                       <div className="col-span-3">
//                         <LinearProgress
//                           variant="determinate"
//                           value={40}
//                           color="success"
//                           sx={{
//                             background: "#d0d0d0",
//                             height: 7,
//                             borderRadius: 4,
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="grid gap-x-0.1 grid-cols-12 items-center">
//                       <div className="col-span-2">
//                         <p className="flex justify-center">
//                           <Rating value={4} readOnly />
//                         </p>
//                       </div>
//                       <div className="col-span-3">
//                         <LinearProgress
//                           variant="determinate"
//                           value={30}
//                           color="success"
//                           sx={{
//                             background: "#d0d0d0",
//                             height: 7,
//                             borderRadius: 4,
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="grid gap-x-0.1 grid-cols-12 items-center">
//                       <div className="col-span-2">
//                         <p className="flex justify-center">
//                           <Rating value={3} readOnly />
//                         </p>
//                       </div>
//                       <div className="col-span-3">
//                         <LinearProgress
//                           variant="determinate"
//                           value={60}
//                           color="success"
//                           sx={{
//                             background: "#d0d0d0",
//                             height: 7,
//                             borderRadius: 4,
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="grid gap-x-0.1 grid-cols-12 items-center">
//                       <div className="col-span-2">
//                         <p className="flex justify-center">
//                           <Rating value={2} readOnly />
//                         </p>
//                       </div>
//                       <div className="col-span-3">
//                         <LinearProgress
//                           variant="determinate"
//                           value={5}
//                           color="success"
//                           sx={{
//                             background: "#d0d0d0",
//                             height: 7,
//                             borderRadius: 4,
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="grid gap-x-0.1 grid-cols-12 items-center">
//                       <div className="col-span-2">
//                         <p className="flex justify-center">
//                           <Rating value={1} readOnly />
//                         </p>
//                       </div>
//                       <div className="col-span-3">
//                         <LinearProgress
//                           variant="determinate"
//                           value={3}
//                           color="success"
//                           sx={{
//                             background: "#d0d0d0",
//                             height: 7,
//                             borderRadius: 4,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </Box>
//               </div>
//               <div className="grid grid-cols-12 gap-7">
//                 <div className="col-span-7">
//                   <InputPersionalnfor rating={true} />
//                 </div>
//                 <div className="col-span-7">
//                   <div className="space-y-5">
//                     {[1, 1, 1, 1, 1].map((index) => (
//                       <ProductReviewCard key={index} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-10 flex flex-col items-start">
//             <h1 className="text-2xl font-semibold">
//               Hỏi đáp về {product.name}
//             </h1>
//             <div className="border p-5 rounded-lg shadow-2xl">
//               <div className="grid grid-cols-12 gap-7">
//                 <div className="col-span-7">
//                   <InputPersionalnfor rating={false} />
//                 </div>
//                 <div className="col-span-7">
//                   <div className="space-y-5">
//                     {[1, 1, 1, 1, 1].map((index) => (
//                       <ProductReviewCard key={index} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="mx-75 my-5 pt-5">
//           <div className="rounded-lg shadow-2xl">
//             <h1 className="py-5 mx-2 text-2xl font-semibold">
//               SẢN PHẨM CÙNG LOẠI
//             </h1>
//             {/* <div className="flex flex-wrap space-y-5 justify-center">
//               {mockProductData.products.slice(0, 8).map((item) => (
//                 <ProductCard key={item.id} product={item} />
//               ))}
//             </div> */}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../../State/Auth/Action";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sửa lại để truy cập state.auth thay vì state
  const { productDetails, loading, error } = useSelector((state) => state.auth);

  const [selectedVariation, setSelectedVariation] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log("Dispatching getProductDetails with productId:", productId); // Log để debug
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    console.log("productDetails updated:", productDetails); // Log để debug
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

  const handleAddToCart = () => {
    navigate("/cart");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
          <div className="lg:col-span-1 max-auto max-w-2xl px-2 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 ml-20">
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
                            <span className="mx-1">{variation.color}</span>
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
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                  >
                    Thêm vào giỏ hàng <AddShoppingCartIcon />
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
                  Highlights
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Screen Size: {productDetails.screenSize}"
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Battery Capacity: {productDetails.batteryCapacity} mAh
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        OS: {productDetails.os}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
