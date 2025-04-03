import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Grid, Avatar, Pagination } from "@mui/material";

const Cart = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State để quản lý trang hiện tại
  const itemsPerPage = 5; // Số lượng cartItems trên mỗi trang

  useEffect(() => {
    fetch(`http://localhost:8081/api/admin/carts/user/id/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        return response.json();
      })
      .then((data) => {
        setCart(data[0]); // Giả định chỉ có một giỏ hàng
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

  if (!cart) {
    return <Typography sx={{ color: "#94a3b8", textAlign: "center" }}>No cart found for this user.</Typography>;
  }

  // Tính toán các cartItems hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cart.cartItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          marginBottom: 3,
          backgroundColor: "#2F363F", // Màu nền tối
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              fontWeight: "bold",
              color: "#ffffff", // Màu chữ trắng
            }}
          >
            Summary
          </Typography>
          <Typography sx={{ color: "#d1d5db" /* Màu chữ xám nhạt */ }}>
            Total Items: {cart.totalItems}
          </Typography>
          <Typography sx={{ color: "#d1d5db" }}>
            Subtotal:{" "}
            <span style={{ fontWeight: "bold", color: "#63b3ed" /* Màu xanh nhạt */ }}>
              {cart.subtotal.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </Typography>
          <Typography sx={{ color: "#d1d5db" }}>
            Total Discount:{" "}
            <span style={{ fontWeight: "bold", color: "#f56565" /* Màu đỏ nhạt */ }}>
              {cart.totalDiscountPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {currentItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card
              sx={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#2F363F", // Màu nền tối
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {/* Hình ảnh sản phẩm */}
                  <Avatar
                    src={item.imageURL || "https://via.placeholder.com/50"}
                    alt={item.variationName}
                    sx={{
                      width: 60,
                      height: 60,
                      border: "1px solid #4a5568", // Viền xám
                    }}
                  />
                  {/* Thông tin sản phẩm */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#ffffff" }}
                    >
                      {item.variationName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                      Subtotal:{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#63b3ed" /* Màu xanh nhạt */,
                        }}
                      >
                        {item.subtotal.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                      Discounted Price:{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#f56565" /* Màu đỏ nhạt */,
                        }}
                      >
                        {item.totalDiscountPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Pagination
          count={Math.ceil(cart.cartItems.length / itemsPerPage)}
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
      </Box>
    </Box>
  );
};

export default Cart;