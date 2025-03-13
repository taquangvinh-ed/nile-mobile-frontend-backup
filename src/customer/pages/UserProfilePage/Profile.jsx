import { Button } from "@mui/material";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [gender, setGender] = useState("male");
  const [isEditting, setIsEditting] = useState(false);
  const [birthDate, setBirthDate] = useState(dayjs());

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
      });
      //   if (user.birthDate) {
      //     setBirthDate(dayjs(user.birthDate));
      //   }
    }
  }, [user]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditting(true);
  };

  const handleSaveClick = () => {
    setIsEditting(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      gender: data.get("gender"),
    };
    console.log(updatedData);
    handleSaveClick();
  };

  return (
    <div className="mx-3 my-5">
      <div className="mx-3 mt-2">
        <Typography variant="h5" color="primary">
          Hồ sơ của tôi
        </Typography>
        <p className="text-gray-500">
          Quản lý thông tin hồ sơ để bảo mật tài khoản an toàn
        </p>
        <Divider />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-5">
          <div className="col-span-4 mr-10">
            <div className=" grid grid-cols-4">
              <div className=" my-5 col-span-1 grid grid-cols-1 space-y-4 items-center px-4 justify-end">
                <p className="text-[1rem] text-gray-600">Số điện thoại: </p>
                <p className="text-[1rem] text-gray-600">Họ</p>
                <p className="text-[1rem] text-gray-600">Tên</p>
                <p className="text-[1rem] text-gray-600">Email:</p>
                <p className="text-[1rem] text-gray-600">Giới tính:</p>
                <p className="text-[1rem] text-gray-600">Ngày sinh:</p>
              </div>
              <div className="my-5 col-span-3 grid grid-cols-1 space-y-4">
                <TextField
                  name="phoneNumber"
                  fullWidth
                  variant="outlined"
                  value={formData.phoneNumber}
                  disabled={!isEditting}
                ></TextField>
                <TextField
                  name="lastName"
                  fullWidth
                  variant="outlined"
                  value={formData.lastName}
                  disabled={!isEditting}
                ></TextField>
                <TextField
                  name="firstName"
                  fullWidth
                  variant="outlined"
                  value={formData.firstName}
                  disabled={!isEditting}
                ></TextField>
                <TextField
                  name="email"
                  fullWidth
                  variant="outlined"
                  value={formData.email}
                  disabled={!isEditting}
                ></TextField>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    name="gender"
                    value={gender}
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Nam"
                      disabled={!isEditting}
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Nữ"
                      disabled={!isEditting}
                    />
                  </RadioGroup>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={birthDate}
                      onChange={(newValue) => setBirthDate(newValue)}
                      disabled={!isEditting}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="mt-5 col-span-4 flex justify-end">
                <div className="mx-3">
                  <Button
                    type="submit"
                    variant={isEditting ? "contained" : "outlined"}
                    disabled={!isEditting}
                  >
                    Lưu
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleEditClick}
                    variant={isEditting ? "outlined" : "contained"}
                    disabled={isEditting}
                  >
                    Chỉnh sửa thông tin
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Chọn Ảnh</Typography>
              <Typography variant="body2">
                Dụng lượng file tối đa 1 MB
                <br />
                Định dạng: JPEG, PNG
              </Typography>
              <Button
                disabled={!isEditting}
                variant="outlined"
                sx={{ marginTop: 1 }}
              >
                Tải ảnh lên
              </Button>
            </Box>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
