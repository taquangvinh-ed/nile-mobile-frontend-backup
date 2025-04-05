import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Pagination, IconButton, Tooltip, Box, Avatar, Select, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
      return "#00838F";
    case "COMPLETED":
      return "#388E3C"; // Màu xanh lá
    case "CANCELED":
      return "#C2185B"; // Màu hồng đậm
    default:
      return "#607D8B"; // Màu xám
  }
};

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const rowsPerPage = 10;

  const orderStatuses = ["PLACED", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "COMPLETED", "CANCELED"];

  useEffect(() => {
    fetch("http://localhost:8081/api/admin/orders/list", {
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
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
        setLoading(false);
      });
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    fetch(`http://localhost:8081/api/admin/orders/updateStatus/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update order status");
        }
        return response.json();
      })
      .then((updatedOrder) => {
        setOrders((prevOrders) => prevOrders.map((order) => (order.orderId === orderId ? { ...order, status: updatedOrder.status } : order)));
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        alert("Failed to update order status");
      });
  };

  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <div className="p-5">
      <TableContainer component={Paper} sx={{ bgcolor: "#212529", borderRadius: "15px" }}>
        <Table sx={{ minWidth: 650, bgcolor: "#212529", "& .MuiTableCell-root": { borderBottom: "1px solid #3a4752" } }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "10%" }}>
                Order ID
              </TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "25%" }}>Customer Name</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "20%" }}>Total Price</TableCell>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "20%" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "15%" }}>
                Order Date
              </TableCell>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "10%" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <React.Fragment key={order.orderId}>
                  <TableRow sx={{ "&:hover": { backgroundColor: "#2c3034" } }}>
                    <TableCell align="center" sx={{ color: "#e2e8f0" }}>
                      {order.orderId}
                    </TableCell>
                    <TableCell sx={{ color: "#e2e8f0" }}>{order.fullname}</TableCell>
                    <TableCell sx={{ color: "#e2e8f0" }}>{order.totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</TableCell>
                    <TableCell align="center">
                      <Select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                        size="small"
                        sx={{
                          color: getStatusTextColor(order.status),
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          backgroundColor: "#212529",
                          borderRadius: "10px",
                          border: "0.5px solid",
                          borderColor: getStatusTextColor(order.status),
                          "& .MuiSelect-icon": { color: "#94a3b8" },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none", // Loại bỏ viền mặc định của Select
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: "#343A40",
                              marginTop: 0.5,
                              color: "#d3d7dc",
                              borderRadius: 3,
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                            },
                          },
                        }}
                      >
                        {orderStatuses.map((status) => (
                          <MenuItem
                            key={status}
                            value={status}
                            size="small"
                            sx={{
                              color: "#d3d7dc",
                              "&:hover": { bgcolor: "#495057" }, // Màu khi hover vào
                              "&.Mui-selected": { bgcolor: "#6C757D", color: "#fff" }, // Màu khi được chọn
                              "&.Mui-selected:hover": { bgcolor: "#6C757D " }, // Màu khi đã chọn và hover vào
                            }}
                          >
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#e2e8f0" }}>
                      {order.orderDate}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#e2e8f0" }}>
                      <Tooltip title="View Details" arrow>
                        <IconButton
                          sx={{
                            bgcolor: "#475569",
                            color: "#ffffff",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            width: "44px",
                            height: "30px",
                            "&:hover": { bgcolor: "#64748b" },
                          }}
                          onClick={() => toggleOrderDetails(order.orderId)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  {expandedOrderId === order.orderId && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ backgroundColor: "#2c3034", padding: "16px", color: "#e2e8f0" }}>
                        <Typography variant="body2" sx={{ marginBottom: 1, color: "#94a3b8" }}>
                          <strong>Payment Method:</strong> {order.paymentMethod}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 1, color: "#94a3b8" }}>
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
                              backgroundColor: "#3a4752",
                              borderRadius: "4px",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar src={item.imageURL || "https://via.placeholder.com/50"} alt={item.variationName} sx={{ width: 50, height: 50 }} />
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#e2e8f0" }}>
                                  {item.variationName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                                  ID: {item.variationId} &nbsp; Quantity: {item.quantity}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#e2e8f0" }}>
                              {item.totalDiscountPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </Typography>
                          </Box>
                        ))}
                        <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 1, color: "#94a3b8" }}>
                          <strong>Phone:</strong> {order.phoneNumber}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 1, color: "#94a3b8" }}>
                          <strong>Shipping Address:</strong> {order.shippingAddress}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#94a3b8" }}>
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(orders.length / rowsPerPage)}
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
    </div>
  );
};

export default OrdersTable;
