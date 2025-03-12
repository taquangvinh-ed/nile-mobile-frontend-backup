import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onSuccess, navigateRegister }) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = () => {};
  return (
    <div>
      <section className="bg-gray-50 border w-[25rem]">
        <div className="flex flex-col items-center justify-center py-0 ">
          <div className="  w-full bg-white rounded-lg sm:max-w-md p-6 ">
            <div className="flex justify-center items-center py-2">
              <img
                className="w-10 h-10 mr-2"
                src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739246144/ecommerce/images/Logo/hvqpxo32q2njeq0uwph9.png"
                alt="logo"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-xl font-bold text-center text-gray-900">
                Đăng nhập
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">
                        Ghi nhớ tôi
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Đăng nhập
                </button>
              </form>
              <button
                className="text-blue-600 hover:text-blue-700"
                onClick={navigateRegister}
              >
                Bạn chưa có tài khoản? Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
