import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";
import { Autocomplete, Box, Button, TextField, CircularProgress, Alert, Snackbar } from "@mui/material";
import { getUserAddresses, updateAddress, updateShippingAddress, deleteOrder } from "../../../State/Auth/Action";

const ConfirmDeliverAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("orderId");

  const { addresses, addressesLoading, addressesError, orderLoading, orderError } = useSelector((state) => state.auth);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false); // Trạng thái khi hủy đơn hàng
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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

  const handleDeliverHere = () => {
    if (!orderId) {
      setSnackbar({
        open: true,
        message: "Không tìm thấy ID đơn hàng!",
        severity: "error",
      });
      return;
    }

    const selectedAddress = addresses.find((addr) => addr.addressId === selectedAddressId);
    if (!selectedAddress) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn một địa chỉ!",
        severity: "error",
      });
      return;
    }

    dispatch(updateShippingAddress(orderId, selectedAddress)).then((result) => {
      if (result.payload.success) {
        navigate(`/checkout?step=4&orderId=${orderId}`);
      } else {
        setSnackbar({
          open: true,
          message: "Lỗi khi cập nhật địa chỉ: " + result.payload.error,
          severity: "error",
        });
      }
    });
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
        setSnackbar({
          open: true,
          message: "Thêm địa chỉ thành công!",
          severity: "success",
        });
        const newAddress = result.payload.address; // Giả định API trả về địa chỉ mới
        if (orderId) {
          dispatch(updateShippingAddress(orderId, newAddress)).then((updateResult) => {
            if (updateResult.payload.success) {
              setTimeout(() => {
                navigate(`/checkout?step=4&orderId=${orderId}`);
              }, 1000);
            } else {
              setSnackbar({
                open: true,
                message: "Lỗi khi cập nhật địa chỉ cho đơn hàng: " + updateResult.payload.error,
                severity: "error",
              });
            }
          });
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Lỗi khi thêm địa chỉ: " + error.message,
        severity: "error",
      });
    }
  };

  const handleCancelOrder = async () => {
    if (!orderId) {
      setSnackbar({
        open: true,
        message: "Không tìm thấy ID đơn hàng để hủy!",
        severity: "error",
      });
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      setIsCancelling(true);
      try {
        const result = await dispatch(deleteOrder(orderId));
        if (result.success) {
          setSnackbar({
            open: true,
            message: "Đơn hàng đã được hủy thành công!",
            severity: "success",
          });
          setTimeout(() => navigate("/"), 2000); // Chuyển về trang chủ sau 2 giây
        } else {
          setSnackbar({
            open: true,
            message: "Lỗi khi hủy đơn hàng: " + (result.error || "Không xác định"),
            severity: "error",
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Lỗi khi hủy đơn hàng: " + error.message,
          severity: "error",
        });
      } finally {
        setIsCancelling(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
                {selectedAddressId === address.addressId && (
                  <Button sx={{ mt: 2 }} size="large" variant="contained" onClick={handleDeliverHere} disabled={orderLoading}>
                    Giao ở địa chỉ này
                  </Button>
                )}
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
                    <div className="w-full h-full py-4 flex justify-between items-center">
                      <Button variant="contained" color="error" onClick={handleCancelOrder} disabled={isCancelling || !orderId} startIcon={isCancelling ? <CircularProgress size={20} /> : null}>
                        {isCancelling ? "Đang hủy..." : "Hủy đơn hàng"}
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          padding: "0.8rem",
                          bgcolor: "RGB(42 193 36)",
                          fontSize: "1rem",
                        }}
                        disabled={orderLoading}
                      >
                        Hoàn thành
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              {orderError && <div className="text-red-500">Lỗi: {orderError}</div>}
            </Box>
          </div>
        </div>
      </div>

      {/* Snackbar thông báo */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ConfirmDeliverAddress;
