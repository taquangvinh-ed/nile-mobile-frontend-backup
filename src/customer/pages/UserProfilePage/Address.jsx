import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AddressCard from "./UserAddressCard";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { getUserAddresses, updateAddress, } from "../../../State/Auth/Action";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const { addresses, addressesLoading, addressesError } = useSelector((state) => state.auth);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  useEffect(() => {
    async function fetchProvinces() {
      const res = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
      if (!res.ok) throw new Error("Something went wrong with fetching province");
      const data = await res.json();
      setProvinces(data.data);
    }
    fetchProvinces();
  }, []);

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const addressData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      addressLine: formData.get("address"),
      province: selectedProvince || "",
      district: selectedDistrict || "",
      ward: selectedWard || "",
      phoneNumber: formData.get("phoneNumber"),
      isDefault: false,
    };

    try {
      const result = await dispatch(updateAddress(addressData));
      if (result.payload.success) {
        // Sau khi thêm địa chỉ mới, cập nhật địa chỉ này cho order
        const newAddress = result.payload.address; // Giả định API trả về địa chỉ mới
      }
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 grid grid-cols-1 border rounded-e-sm shadow-md h-[30rem] overflow-y-scroll">
          {addressesLoading ? (
            <p>Loading addresses...</p>
          ) : addressesError ? (
            <p>Error: {addressesError}</p>
          ) : addresses.length === 0 ? (
            <p>Không có địa chỉ nào. Vui lòng thêm địa chỉ mới.</p>
          ) : (
            addresses.map((address) => (
              <div key={address.addressId} className="p-5 py-7 border-b cursor-pointer">
                <AddressCard address={address} isSelected={selectedAddressId === address.addressId} onSelect={handleSelectAddress} />
                {selectedAddressId === address.addressId}
              </div>
            ))
          )}
        </div>

        <div className="col-span-2 grid grid-cols-2">
          <div className="col-span-3">
            <Box className="w-full border rounded-s-md shadow-md p-5">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  <div className="col-span-1 grid grid-cols-1">
                    <TextField required id="lastName" name="lastName" label="Họ" fullWidth autoComplete="family-name" />
                  </div>
                  <div className="col-span-1 grid grid-cols-1">
                    <TextField required id="firstName" name="firstName" label="Tên" fullWidth autoComplete="given-name" />
                  </div>
                  <div className="col-span-2 grid grid-cols-1">
                    <TextField required id="address" name="address" label="Địa chỉ" fullWidth autoComplete="address" multiline rows={4} />
                  </div>
                  <div className="col-span-1 grid grid-cols-1">
                    <Autocomplete
                      id="province"
                      options={provinces}
                      getOptionLabel={(option) => option.full_name}
                      onChange={async (event, newValue) => {
                        setSelectedProvince(newValue?.full_name || null);
                        if (newValue) {
                          const res = await fetch(`https://esgoo.net/api-tinhthanh/2/${newValue.id}.htm`);
                          if (!res.ok) throw new Error("Get Districts fail");
                          const data = await res.json();
                          setDistricts(data.data);
                        } else {
                          setDistricts([]);
                          setWards([]);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" variant="outlined" fullWidth required />}
                    />
                  </div>
                  <div className="col-span-1 grid grid-cols-1">
                    <Autocomplete
                      id="district"
                      options={districts}
                      getOptionLabel={(option) => option.full_name}
                      onChange={async (event, newValue) => {
                        setSelectedDistrict(newValue?.full_name || null);
                        if (newValue) {
                          const res = await fetch(`https://esgoo.net/api-tinhthanh/3/${newValue.id}.htm`);
                          if (!res.ok) throw new Error("Get Districts fail");
                          const data = await res.json();
                          setWards(data.data);
                        } else {
                          setWards([]);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Quận/Huyện" variant="outlined" fullWidth required />}
                    />
                  </div>
                  <div className="col-span-1 grid grid-cols-1">
                    <Autocomplete
                      id="ward"
                      options={wards}
                      getOptionLabel={(option) => option.full_name}
                      onChange={(event, newValue) => {
                        setSelectedWard(newValue?.full_name || null);
                      }}
                      renderInput={(params) => <TextField {...params} label="Phường/Xã" variant="outlined" fullWidth required />}
                    />
                  </div>
                  <div className="col-span-1 grid grid-cols-1">
                    <TextField type="number" required id="phoneNumber" name="phoneNumber" label="Số điện thoại" fullWidth autoComplete="phone-number" />
                  </div>
                  <div className="col-span-2 grid grid-cols-1">
                    <div className="w-full h-full py-4 flex justify-center items-center">
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

export default Address;
