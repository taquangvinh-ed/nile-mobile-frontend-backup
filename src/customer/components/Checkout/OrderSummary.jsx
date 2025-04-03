import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert, Snackbar, CircularProgress, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
import { getOrderById, updatePaymentMethod, deleteOrder } from "../../../State/Auth/Action";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("orderId");

  const { order, orderLoading, orderError, paymentUrl } = useSelector((state) => state.auth);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order && order.paymentDetails) {
      setPaymentMethod(order.paymentDetails.paymentMethod);
    } else {
      setPaymentMethod("CASH_ON_DELIVERY");
    }
  }, [order]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCancelOrder = async () => {
    if (order.status !== "PLACED") {
      setSnackbar({
        open: true,
        message: "Chỉ có thể hủy đơn hàng ở trạng thái đặt hàng!",
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
          setTimeout(() => navigate("/"), 2000);
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

  const handleConfirmOrder = async () => {
    if (order.status !== "PLACED") {
      setSnackbar({
        open: true,
        message: "Đơn hàng đã được xác nhận hoặc đang xử lý",
        severity: "error",
      });
      return;
    }

    if (!paymentMethod) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn phương thức thanh toán!",
        severity: "error",
      });
      return;
    }

    setIsConfirming(true);
    try {
      const result = await dispatch(updatePaymentMethod(orderId, paymentMethod));
      if (result.payload.success) {
        const updatedOrder = result.payload.order;
        const paymentUrl = result.payload.paymentUrl;

        if (paymentMethod === "VNPAY" && paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          setSnackbar({
            open: true,
            message: "Xác nhận đơn hàng thành công!",
            severity: "success",
          });
          setTimeout(() => navigate(`/checkout?step=5&orderId=${orderId}`), 2000);
        }
      } else {
        setSnackbar({
          open: true,
          message: "Lỗi khi cập nhật phương thức thanh toán: " + result.payload.error,
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Lỗi khi xác nhận đơn hàng: " + error.message,
        severity: "error",
      });
    } finally {
      setIsConfirming(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleBack = () => {
    navigate("/checkout?step=3"); // Quay lại bước trước (ví dụ: chọn địa chỉ)
  };

  if (!orderId) {
    return <Typography>Không tìm thấy ID đơn hàng!</Typography>;
  }

  if (orderLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
        <Typography ml={2}>Đang tải thông tin đơn hàng...</Typography>
      </Box>
    );
  }

  if (orderError) {
    return <Typography color="error">Lỗi: {orderError}</Typography>;
  }

  if (!order) {
    return <Typography>Không tìm thấy đơn hàng!</Typography>;
  }

  const shippingAddress = order.shippingAddress || null;
  const orderItems = order.orderDetails || [];
  const totalPrice = order.totalPrice || 0;
  const totalDiscountPrice = order.totalDiscountPrice || 0;

  return (
    <Box p={3} maxWidth="1200px" mx="auto">
      {/* Tiêu đề và nút quay lại */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Tóm tắt đơn hàng (Trạng thái: {order.status})</Typography>
      </Box>

      {/* Địa chỉ giao hàng */}
      <Box border={1} borderRadius={4} boxShadow={3} mb={4} p={3} bgcolor="white">
        <Typography variant="h6" mb={2}>
          Địa chỉ giao hàng
        </Typography>
        {shippingAddress ? <AddressCard address={shippingAddress} isSelected={true} onSelect={() => {}} /> : <Typography>Chưa có địa chỉ giao hàng được chọn.</Typography>}
      </Box>

      {/* Danh sách sản phẩm */}
      <Box border={1} borderRadius={4} boxShadow={3} mb={4} p={3} bgcolor="white">
        <Typography variant="h6" mb={2}>
          Sản phẩm trong đơn hàng
        </Typography>
        {orderItems.length === 0 ? (
          <Typography>Không có sản phẩm trong đơn hàng.</Typography>
        ) : (
          orderItems.map((item, index) => (
            <Box key={index} display="flex" alignItems="center" borderBottom={index < orderItems.length - 1 ? "1px solid #e0e0e0" : "none"} py={2}>
              <img src={item.imageURL || "https://via.placeholder.com/100"} alt={item.product?.title} style={{ width: 80, height: 80, objectFit: "cover", marginRight: 16 }} />
              <Box flex={1}>
                <Typography variant="body1">{item.product?.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Số lượng: {item.quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Giá: {(item.subtotal / item.quantity || 0).toLocaleString()} VNĐ
                </Typography>
              </Box>
              <Typography variant="body1">{item.subtotal.toLocaleString()} VNĐ</Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Tổng giá */}
      <Box border={1} borderRadius={4} boxShadow={3} mb={4} p={3} bgcolor="white">
        <Typography variant="h6" mb={2}>
          Tổng cộng
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Tổng giá sản phẩm:</Typography>
          <Typography>{totalPrice.toLocaleString()} VNĐ</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Giảm giá:</Typography>
          <Typography>{(totalPrice - totalDiscountPrice).toLocaleString()} VNĐ</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Tổng thanh toán:</Typography>
          <Typography variant="h6">{(totalPrice - (totalPrice - totalDiscountPrice)).toLocaleString()} VNĐ</Typography>
        </Box>
      </Box>

      {/* Phương thức thanh toán */}
      <Box border={1} borderRadius={4} boxShadow={3} p={3} bgcolor="white" mb={4}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Phương thức thanh toán</FormLabel>
          <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange} name="payment-method">
            <FormControlLabel value="CASH_ON_DELIVERY" control={<Radio />} label="Thanh toán khi nhận hàng (COD)" />
            <FormControlLabel
              value="VNPAY"
              control={<Radio />}
              label={
                <Box display="flex" alignItems="center">
                  <img src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg" alt="VNPay" style={{ width: 24, height: 24, marginRight: 8 }} />
                  Thanh toán qua VNPay
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Nút hành động */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleCancelOrder}
          disabled={orderItems.length === 0 || !shippingAddress || isCancelling}
          startIcon={isCancelling ? <CircularProgress size={20} /> : null}
        >
          {isCancelling ? "Đang hủy..." : "Hủy đơn hàng"}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleConfirmOrder}
          disabled={orderItems.length === 0 || !shippingAddress || isConfirming}
          startIcon={isConfirming ? <CircularProgress size={20} /> : null}
        >
          {isConfirming ? "Đang xác nhận..." : "Xác nhận đơn hàng"}
        </Button>
      </Box>

      {/* Snackbar thông báo */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderSummary;
