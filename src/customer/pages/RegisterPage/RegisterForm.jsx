import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../State/Auth/Action";
import { store } from "../../../State/store";
import { toast } from "react-toastify";
const Register = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const error = auth.error;
  const isLoading = auth.isLoading;

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleRePasswordChange = (event) => {
    const value = event.target.value;
    setRePassword(value);
    setIsMatch(password === value);
  };

  useEffect(() => {
    setIsMatch(password === repassword);
  }, [password, repassword]);

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  useEffect(() => {}, []);

  const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isMatch) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    if (!isValidPhoneNumber) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    const data = new FormData(event.currentTarget);
    const registerData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: data.get("phoneNumber"),
    };
    try{
      const response = await dispatch(register(registerData));
      if(response.payload && response.payload.success){
        toast.success("Đăng ký tài khoản thành công");
      }else{
        toast.error("Đăng ký thất bại");
      }
    }catch(error){
      console.error("Error:", error);
      toast.error("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
    }

    console.log(registerData);
  };

  return (
    <div>
      <div class="border  w-[35rem] shadow-2xl rounded-xl my-3 max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
        <div class=" text-center mb-12 sm:mb-16">
          <a href="javascript:void(0)">
            <img
              src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739246144/ecommerce/images/Logo/hvqpxo32q2njeq0uwph9.png"
              alt="logo"
              class="w-[6rem] h-[6rem] inline-block"
            />
          </a>
          <h1 class="text-gray-600 text-base text-[2.5rem] font-semibold mt-6">
            Đăng ký tài khoản
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
            <div className="col-span-1">
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Họ"
                fullWidth
                autoComplete="family-name"
              ></TextField>
            </div>

            <div className="col-span-1">
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Tên"
                fullWidth
                autoComplete="given-name"
              ></TextField>
            </div>

            <div className="col-span-1">
              <TextField
                required
                type="email"
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
              ></TextField>
            </div>

            <div className="col-span-1">
              <TextField
                required
                id="pwd"
                type="password"
                name="password"
                label="Nhập mật khẩu"
                fullWidth
                autoComplete="password"
                onChange={handlePasswordChange}
              ></TextField>
            </div>

            <div className="col-span-1 grid">
              <TextField
                required
                id="repwd"
                type="password"
                name="retypedPassword"
                label="Nhập lại mật khẩu"
                fullWidth
                autoComplete="re-password"
                onChange={handleRePasswordChange}
                error={!isMatch && repassword.length > 0}
                helperText={!isMatch && "Mật khẩu không khớp"}
              ></TextField>
            </div>

            <div className="col-span-1">
              <TextField
                type="text"
                required
                id="phoneNumber"
                name="phoneNumber"
                label="Số điện thoại"
                fullWidth
                autoComplete="phone-number"
                onChange={handlePhoneNumberChange}
                error={!isValidPhoneNumber && phoneNumber.length > 0}
                helperText={
                  !isValidPhoneNumber && phoneNumber.length > 0
                    ? "Số điện thoại không hợp lệ"
                    : ""
                }
              ></TextField>
            </div>

            <div className="col-span-1">
              <div class="mt-3 mb-5">
                <button
                  type="submit"
                  disabled={isLoading}
                  class="mx-auto w-full block py-3 px-6 text-md tracking-wider rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                >
                  {isLoading ? "Đang xử lý..." : "Đăng ký"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
