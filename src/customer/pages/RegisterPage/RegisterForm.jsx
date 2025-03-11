import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const Register = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(function () {
    async function fetchProvinces() {
      const res = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
      if (!res.ok)
        throw new Error("Something went wrong with fetching province");
      const data = await res.json();
      setProvinces(data.data);
    }
    fetchProvinces();
  }, []);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleRePasswordChange = (event) => {
    const value = event.target.value;
    setRePassword(value);
    setIsMatch(password === value);
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  return (
    <div>
      <div class="border shadow-2xl rounded-xl my-3 max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
        <div class=" text-center mb-12 sm:mb-16">
          <a href="javascript:void(0)">
            <img
              src="https://res.cloudinary.com/dwif85oqc/image/upload/v1739246144/ecommerce/images/Logo/hvqpxo32q2njeq0uwph9.png"
              alt="logo"
              class="w-[6rem] h-[6rem] inline-block"
            />
          </a>
          <h1 class="text-gray-600 text-base text-[2rem] font-semibold mt-6">
            Đăng ký tài khoản
          </h1>
        </div>

        <form>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            <div className="col-span-1 grid grid-cols-1 ">
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Họ"
                fullWidth
                autoComplete="family-name"
              ></TextField>
            </div>

            <div className="col-span-1 grid grid-cols-1 ">
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Tên"
                fullWidth
                autoComplete="given-name"
              ></TextField>
            </div>
            <div className="col-span-1 grid grid-cols-1">
              <TextField
                required
                id="pwd"
                name="password"
                label="Nhập mật khẩu"
                fullWidth
                autoComplete="password"
                onChange={handlePasswordChange}
              ></TextField>
            </div>
            <div className="col-span-1 grid grid-cols-1 ">
              <TextField
                required
                id="repwd"
                name="retypedPassword"
                label="Nhập lại mật khẩu"
                fullWidth
                autoComplete="re-password"
                onChange={handleRePasswordChange}
                error={!isMatch && repassword.length > 0}
                helperText={!isMatch && "Mật khẩu không khớp"}
              ></TextField>
            </div>
            <div className="col-span-2 grid grid-cols-1 ">
              <TextField
                required
                id="address"
                name="address"
                label="Địa chỉ"
                fullWidth
                autoComplete="address"
                multiline
                rows={4}
              ></TextField>
            </div>
            <div className="col-span-1 grid grid-cols-1 ">
              <Autocomplete
                id="province"
                options={provinces}
                getOptionLabel={(option) => option.full_name}
                onChange={async (event, newValue) => {
                  setSelectedProvince(newValue.full_name);
                  const res = await fetch(
                    `https://esgoo.net/api-tinhthanh/2/${newValue.id}.htm`
                  );
                  if (!res.ok) throw new Error("Get Districts fail");
                  const data = await res.json();
                  setDistricts(data.data);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tỉnh/Thành phố"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </div>
            <div className="col-span-1 grid grid-cols-1 ">
              <Autocomplete
                id="district"
                options={districts}
                getOptionLabel={(option) => option.full_name}
                onChange={async (event, newValue) => {
                  setSelectedDistrict(newValue.full_name);
                  console.log("Selected District:", newValue.full_name);
                  const res = await fetch(
                    `https://esgoo.net/api-tinhthanh/3/${newValue.id}.htm`
                  );
                  if (!res.ok) throw new Error("Get Districts fail");
                  const data = await res.json();
                  setWards(data.data);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Quận/Huyện"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </div>
            <div className="col-span-1 grid grid-cols-1">
              <Autocomplete
                id="ward"
                options={wards}
                getOptionLabel={(option) => option.full_name}
                onChange={(event, newValue) => {
                  setSelectedWard(newValue.full_name);
                  console.log("Selected Ward:", newValue.full_name);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Phường/Xã"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </div>
            <div className="col-span-1 grid grid-cols-1 ">
              <TextField
                type="number"
                required
                id="phoneNumber"
                name="phoneNumber"
                label="Số điện thoại"
                fullWidth
                autoComplete="phone-number"
                onChange={handlePhoneNumberChange}
                error={phoneNumber.length !== 10 && phoneNumber.length > 0}
                helperText={
                  phoneNumber.length !== 10 && phoneNumber.length > 0
                    ? "Số điện thoại không hợp lệ"
                    : ""
                }
              ></TextField>
            </div>
            <div className="col-span-2 grid grid-cols-1 ">
              <div class="mt-8">
                <button
                  type="button"
                  class="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Đăng ký
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
