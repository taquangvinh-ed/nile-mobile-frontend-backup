import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Autocomplete, Box, Button, TextField } from "@mui/material";

const ConfirmDeliverAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

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

  const options = [
    { label: "Hà Nội", id: 1 },
    { label: "Thành phố Hồ Chí Minh", id: 2 },
    { label: "Cần Thơ", id: 3 },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const address = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      streetAddress: formData.get("address"),
      province: selectedProvince ? selectedProvince : null,
      district: selectedDistrict ? selectedDistrict : null,
      ward: selectedWard ? selectedWard : null,
      phoneNumber: formData.get("phoneNumber"),
    };
    console.log("address", address);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 ">
        <div className=" col-span-1 grid grid-cols-1 border rounded-e-sm shadow-md h-[30rem] overflow-y-scroll">
          <div className="p-5 py-7 border-b cursor-pointer">
            <AddressCard />
            <Button sx={{ mt: 2 }} size="large" variant="contained">
              Deliver here
            </Button>
          </div>
        </div>
        <div className=" col-span-2  grid grid-cols-2">
          <div className="col-span-3">
            <Box className=" w-full border rounded-s-md shadow-md p-5">
              <form onSubmit={handleSubmit} className="">
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
                    ></TextField>
                  </div>
                  <div className="col-span-2 grid grid-cols-1 ">
                    <div className="w-full h-full py-4 flex justify-center items-center ">
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          padding: "0.8rem",
                          bgcolor: "RGB(42 193 36)",
                          fontSize: "1rem",
                        }}
                      >
                        Hoàn thành
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeliverAddress;
