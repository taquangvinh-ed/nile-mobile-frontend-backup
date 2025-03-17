import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { getOrderById, updatePaymentMethod } from "../../../State/Auth/Action"; // Giả định bạn có action để lấy đơn hàng

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("orderId");

  const { order, orderLoading, orderError } = useSelector((state) => state.auth);

  const [paymentMethod, setPaymentMethod] = React.useState("COD"); // Mặc định là thanh toán khi nhận hàng

  // Lấy thông tin đơn hàng khi component mount
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleConfirmOrder = async () => {
    const result = await dispatch(updatePaymentMethod(orderId, paymentMethod));
    if (result.payload.success) {
      navigate(`/checkout?step=5&orderId=${orderId}`);
    } else {
      alert("Lỗi khi cập nhật phương thức thanh toán: " + result.payload.error);
    }
  };

  if (!orderId) {
    return <Typography>Không tìm thấy ID đơn hàng!</Typography>;
  }

  if (orderLoading) {
    return <Typography>Đang tải thông tin đơn hàng...</Typography>;
  }

  if (orderError) {
    return <Typography color="error">Lỗi: {orderError}</Typography>;
  }

  if (!order) {
    return <Typography>Không tìm thấy đơn hàng!</Typography>;
  }

  const shippingAddress = order.address || null; // Địa chỉ giao hàng từ đơn hàng
  const orderItems = order.orderItems || []; // Danh sách sản phẩm trong đơn hàng
  const totalPrice = order.total_price || 0;
  const totalDiscountPrice = order.total_discount_price || 0;

  return (
    <div className="p-5">
      <Typography variant="h5" gutterBottom>
        Tóm tắt đơn hàng
      </Typography>

      {/* Hiển thị địa chỉ giao hàng */}
      <div className="border rounded-xl shadow-2xl mb-5">
        <Typography variant="h6" className="p-4">
          Địa chỉ giao hàng
        </Typography>
        {shippingAddress ? (
          <AddressCard
            address={shippingAddress}
            isSelected={true} // Địa chỉ đã được chọn
            onSelect={() => {}} // Không cần chọn lại
          />
        ) : (
          <Typography className="p-4">Chưa có địa chỉ giao hàng được chọn.</Typography>
        )}
      </div>

      {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
      <div className="border rounded-xl shadow-2xl mb-5">
        <Typography variant="h6" className="p-4">
          Sản phẩm trong đơn hàng
        </Typography>
        {orderItems.length === 0 ? (
          <Typography className="p-4">Không có sản phẩm trong đơn hàng.</Typography>
        ) : (
          orderItems.map((item, index) => (
            <Box key={index} display="flex" alignItems="center" className="p-4 border-b">
              <img
                src={item.product?.imageUrl || "https://via.placeholder.com/100"}
                alt={item.product?.title}
                className="w-20 h-20 object-cover mr-4"
              />
              <Box flex="1">
                <Typography variant="body1">{item.product?.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Số lượng: {item.quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Giá: {(item.price || 0).toLocaleString()} VNĐ
                </Typography>
              </Box>
              <Typography variant="body1">
                {(item.price * item.quantity).toLocaleString()} VNĐ
              </Typography>
            </Box>
          ))
        )}
      </div>

      {/* Hiển thị tổng giá */}
      <div className="border rounded-xl shadow-2xl mb-5 p-4">
        <Typography variant="h6">Tổng cộng</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography>Tổng giá sản phẩm:</Typography>
          <Typography>{totalPrice.toLocaleString()} VNĐ</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography>Giảm giá:</Typography>
          <Typography>{totalDiscountPrice.toLocaleString()} VNĐ</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="h6">Tổng thanh toán:</Typography>
          <Typography variant="h6">
            {(totalPrice - totalDiscountPrice).toLocaleString()} VNĐ
          </Typography>
        </Box>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className="border rounded-xl shadow-2xl p-4">
        <FormControl component="fieldset">
          <FormLabel component="legend">Phương thức thanh toán</FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            name="payment-method"
          >
            <FormControlLabel
              value="COD"
              control={<Radio />}
              label="Thanh toán khi nhận hàng (COD)"
            />
            <FormControlLabel
              value="VNPAY"
              control={<Radio />}
              label="Thanh toán qua VNPay"
            />
          </RadioGroup>
        </FormControl>
      </div>

      {/* Nút xác nhận đơn hàng */}
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmOrder}
          disabled={orderItems.length === 0 || !shippingAddress}
        >
          Xác nhận đơn hàng
        </Button>
      </Box>
    </div>
  );
};

export default OrderSummary;