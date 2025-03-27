import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Paper, Divider, Icon } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  textAlign: "center",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
}));

// Tùy chỉnh nút
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 3),
  borderRadius: "8px",
  fontWeight: "bold",
  textTransform: "none",
}));

const Complete = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("orderId"); // Lấy orderId từ query parameter

  // Hàm điều hướng về trang chủ
  const handleBackToHome = () => {
    navigate("/");
  };

  const handleViewOrderDetails = () => {
    if (orderId) {
      navigate(`/order/${orderId}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledPaper elevation={3}>
        {/* Biểu tượng thành công */}
        <Box display="flex" justifyContent="center" mb={2}>
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "success.main" }} />
        </Box>

        {/* Tiêu đề */}
        <Typography variant="h4" component="h1" gutterBottom color="success.main">
          Đặt hàng thành công!
        </Typography>

        {/* Thông báo chính */}
        <Typography variant="body1" color="text.secondary" paragraph>
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được đặt thành công.
        </Typography>

        {/* Thông tin đơn hàng (nếu có orderId) */}
        {orderId && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Mã đơn hàng: <strong>#{orderId}</strong>
            </Typography>
          </>
        )}

        {/* Nút hành động */}
        <Box mt={4}>
          {/* <StyledButton
            variant="contained"
            color="primary"
            onClick={handleViewOrderDetails}
            disabled={!orderId} // Vô hiệu hóa nếu không có orderId
          >
            Xem chi tiết đơn hàng
          </StyledButton> */}
          <StyledButton variant="outlined" color="primary" onClick={handleBackToHome}>
            Quay lại trang chủ
          </StyledButton>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Complete;
