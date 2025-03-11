import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <div className="bg-black mt-10 border border-black ">
      <div className="grid grid-cols-4 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 mx-75">
        <div className="flex flex-col justify-start items-start">
          <img
            alt=""
            src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739246144/ecommerce/images/Logo/hvqpxo32q2njeq0uwph9.png"
            className="h-14 w-auto object-cover mb-2"
          />
          <p className="text-white">
            Điện thoại xịn, giá hợp lý - Mua ngay, yên tâm dùng lâu!
          </p>
          <div className="mt-7">
            <h1 className="mb-2  text-lg font-semibold text-gray-900 dark:text-white">
              Thanh toán miễn phí
            </h1>
            <div className="flex flex-row">
              <span className="w-95 mx-3">
                <img
                  width="120"
                  height="120"
                  src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739278463/ecommerce/images/Logo/v6kcz0sawsvowihdr9gq.png"
                  alt="youtube-play"
                  className="bg-white object-cover"
                />
              </span>
              <span className="w-95">
                <img
                  width="65"
                  height="65"
                  src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739279747/ecommerce/images/Logo/rdxq7i866wpyknf5d0ci.jpg"
                  alt="youtube-play"
                  className="bg-white object-cover"
                />
              </span>
              <span className="w-95 mx-3">
                <img
                  width="145"
                  height="145"
                  src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739280059/ecommerce/images/Logo/lx0blx2qokdbncjphpy3.png"
                  alt="youtube-play"
                  className="bg-white object-cover"
                />
              </span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1 className="mb-2  text-lg font-semibold text-gray-900 dark:text-white">
              Tổng đài hỗ trợ miễn phí
            </h1>
            <ul className="text-white font-medium pl-3">
              <p>
                Gọi điện mua hàng:{" "}
                <span className="text-blue-700">1700.xxx.xxx</span>
              </p>
              <p>
                Gọi điện khiếu nại:{" "}
                <span className="text-blue-700">1700.xxx.xxx</span>
              </p>
              <p>
                Gọi điện bảo hành:{" "}
                <span className="text-blue-700">1700.xxx.xxx</span>
              </p>
            </ul>
          </div>
          <div className="mt-8">
            <h1 className="text-lg text-white font-semibold">
              Kết nối với chúng tôi
            </h1>
            <div className="flex flex-row block items-center justify-start">
              <span className="mx-2">
                <a href="#">
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/3d-fluency/94/youtube-play.png"
                    alt="youtube-play"
                    className="transition-transform duration-200 ease-in-out transform hover:scale-125"
                  />
                </a>
              </span>
              <span className="mx-2">
                <a href="#">
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/3d-fluency/94/facebook-logo.png"
                    alt="facebook-logo"
                    className="transition-transform duration-200 ease-in-out transform hover:scale-125"
                  />
                </a>
              </span>
              <span className="mx-2">
                <a href="#">
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/3d-fluency/94/tiktok-logo.png"
                    alt="tiktok-logo"
                    style={{
                      borderRadius: "50%",
                    }}
                    className="transition-transform duration-2 ease-in-out transform hover:scale-125"
                  />
                </a>
              </span>
              <span className="mx-2">
                <a href="#">
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/color/48/zalo.png"
                    alt="zalo"
                    className="transition-transform duration-2 ease-in-out transform hover:scale-125"
                  />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white ">
            Chính sách - Dịch vụ
          </h1>
          <ul className="text-gray-400 font-thin pl-3">
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Chính sách giao hàng</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Chính sách đổi mới và bảo hành</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Chính sách giải quyết khiếu nại</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Dịch vụ bảo hành mở rộng</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Tra cứu đơn hàng</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Ưu đãi thanh toán</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Quy chế hoạt động</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Tuyển dụng</a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white ">
            Thông tin
          </h1>
          <ul className="text-gray-400 font-thin pl-3">
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Khách hàng và doanh nghiệp</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Quy chế hoạt động</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Liên hệ hợp tác kinh doanh</a>
            </li>
            <li className="mb-2 hover:underline hover:text-white">
              <a href="#">Tuyển dụng</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          &copy; 2025{" "}
          <a href="#" className="hover:underline">
            Mobile™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
