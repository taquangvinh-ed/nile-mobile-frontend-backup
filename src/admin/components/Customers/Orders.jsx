import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, Grid, Avatar, Chip, Collapse, Pagination } from "@mui/material"; // Import Pagination
import { format } from "date-fns";

const getStatusBackgroundColor = (status) => {
  switch (status) {
    case "PLACED":
      return "#E3F2FD"; // Màu xanh nhạt
    case "CONFIRMED":
      return "#FFF3E0"; // Màu cam nhạt
    case "PROCESSING":
      return "#FFEBEE"; // Màu đỏ nhạt
    case "SHIPPED":
      return "#E1F5FE"; // Màu xanh dương nhạt
    case "DELIVERED":
      return "#E0F7FA"; // Màu xanh lá nhạt
    case "COMPLETE":
      return "#E8F5E9"; // Màu xanh lá nhạt
    case "CANCELED":
      return "#FCE4EC"; // Màu hồng nhạt
    default:
      return "#ECEFF1"; // Màu xám nhạt
  }
};

const getStatusTextColor = (status) => {
  switch (status) {
    case "PLACED":
      return "#1E88E5"; // Màu xanh dương
    case "CONFIRMED":
      return "#FB8C00"; // Màu cam
    case "PROCESSING":
      return "#BB2CD9"; // Màu đỏ
    case "SHIPPED":
      return "#0288D1"; // Màu xanh dương đậm
    case "DELIVERED":
      return "#00838F"; // Màu xanh lá
    case "COMPLETED":
      return "#388E3C"; // Màu xanh lá
    case "CANCELED":
      return "#C2185B"; // Màu hồng đậm
    default:
      return "#607D8B"; // Màu xám
  }
};

const Orders = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State để quản lý trạng thái mở/đóng
  const [currentPage, setCurrentPage] = useState(1); // State để quản lý trang hiện tại
  const ordersPerPage = 5; // Số lượng orders trên mỗi trang

  useEffect(() => {
    fetch(`http://localhost:8081/api/admin/orders/user/id/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (orders.length === 0) {
    return <Typography sx={{ color: "#94a3b8", textAlign: "center" }}>No orders found for this user.</Typography>;
  }

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Tính toán các orders hiển thị trên trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#212529" }}>
      {" "}
      {/* Màu nền tổng thể */}
      <Grid container spacing={3}>
        {currentOrders.map((order) => (
          <Grid item xs={12} key={order.orderId}>
            <Card
              sx={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: getStatusBackgroundColor(order.status), // Màu nền theo trạng thái
                color: getStatusTextColor(order.status), // Màu chữ theo trạng thái
              }}
            >
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {/* Order Info */}
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "inherit" }} // Kế thừa màu chữ từ Card
                    >
                      Order ID: #{order.orderId}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "inherit" }}>
                      {format(new Date(order.orderDate), "MMM dd, yyyy")}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
                      {order.orderDetails.slice(0, 3).map((item, index) => (
                        <Avatar
                          key={index}
                          src={item.imageURL || "https://via.placeholder.com/50"}
                          alt={item.variationName}
                          sx={{
                            width: 50,
                            height: 50,
                            border: "2px solid white",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Order Status */}
                  <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
                    <Chip
                      label={order.status}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng trong suốt
                        color: getStatusTextColor(order.status),
                        fontWeight: "bold",
                      }}
                    />
                    <Typography variant="body2" sx={{ marginTop: 1, color: "inherit" }}>
                      {order.orderDetails.length} {order.orderDetails.length === 1 ? "item" : "items"}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 1, color: "inherit" }}>
                      {order.totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#1976d2",
                      borderRadius: "10px",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                    onClick={() => alert(`Tracking order ${order.orderId}`)}
                  >
                    Track Order
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      textTransform: "none",
                      borderColor: "#1976d2",
                      borderRadius: "10px",
                      color: "#1976d2",
                      "&:hover": { backgroundColor: "#e3f2fd", borderColor: "#1565c0", color: "#1565c0" },
                    }}
                    onClick={() => toggleOrderDetails(order.orderId)}
                  >
                    {expandedOrderId === order.orderId ? "Hide Details" : "View Details"}
                  </Button>
                </Box>

                {/* Order Details */}
                <Collapse in={expandedOrderId === order.orderId}>
                  <Box sx={{ marginTop: 2, padding: 2, backgroundColor: "#ffffff", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                      Order Information
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                      <strong>Payment Method:</strong> {order.paymentMethod}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                      <strong>Items:</strong>
                    </Typography>
                    {order.orderDetails.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 1,
                          padding: 1,
                          backgroundColor: "#f9f9f9",
                          borderRadius: "4px",
                        }}
                      >
                        {/* Hình ảnh sản phẩm */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar src={item.imageURL || "https://via.placeholder.com/50"} alt={item.variationName} sx={{ width: 50, height: 50 }} />
                          {/* Thông tin sản phẩm */}
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                              {item.variationName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#6b7280" }}>
                              ID: {item.variationId} &nbsp; Quantity: {item.quantity}
                            </Typography>
                          </Box>
                        </Box>
                        {/* Giá sản phẩm */}
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {item.totalDiscountPrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography>
                      </Box>
                    ))}
                    <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1 }}>
                      <strong>Shipping Address:</strong> {order.shippingAddress}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(orders.length / ordersPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#94a3b8",
            },
            "& .Mui-selected": {
              color: "white",
              backgroundColor: "#1976d2",
            },
          }}
        />
      </div>
    </Box>
  );
};

export default Orders;
