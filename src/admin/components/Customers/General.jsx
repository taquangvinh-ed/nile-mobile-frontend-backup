import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, Grid, CircularProgress, TextField, Button, Snackbar, Alert } from "@mui/material";

const General = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetch(`http://localhost:8081/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Xóa lỗi khi người dùng nhập lại
    setIsSaveDisabled(false);
  };
  const handleEditClick = () => {
    setIsEditing(true); // Bật chế độ chỉnh sửa
    setIsSaveDisabled(false); // Cho phép nút "Lưu" hoạt động
  };


  const validateFields = () => {
    const newErrors = {};
    if (!formData.phoneNumber.match(/^\d{10}$/)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ!";
    }
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "userId" && key !== "createdDateAt") {
        newErrors[key] = "Trường này không được để trống.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (!validateFields()) {
      return;
    }

    fetch(`http://localhost:8081/api/user/update-profile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user profile");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setIsEditing(false);
        setIsSaveDisabled(true);
        setSnackbar({ open: true, message: "Thay đổi thành công!", severity: "success" });
      })
      .catch((err) => {
        setSnackbar({ open: true, message: "Đã xảy ra lỗi khi lưu!", severity: "error" });
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(user); // Khôi phục dữ liệu ban đầu
    setErrors({});
    setIsSaveDisabled(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f5f7" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", marginTop: 4, fontSize: "1.2rem", fontWeight: "bold" }}>
        Error: {error}
      </Typography>
    );
  }

  if (!user) {
    return <Typography sx={{ color: "#94a3b8", textAlign: "center", marginTop: 4, fontSize: "1.2rem" }}>No user information found.</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px #2F363F inset !important;
            -webkit-text-fill-color: #fff !important;
          }
        `}
      </style>
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#2F363F",
          padding: 4,
        }}
      >
        <Grid container spacing={3}>
          {["userId", "createdDateAt", "lastName", "firstName", "phoneNumber", "email"].map((field) => (
            <Grid item xs={12} md={6} key={field}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "#94a3b8", fontSize: "1rem" }}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}:
              </Typography>
              <TextField
                name={field}
                value={formData[field] || ""}
                onChange={handleInputChange}
                disabled={!isEditing || field === "userId" || field === "createdDateAt"}
                fullWidth
                variant="outlined"
                size="small"
                error={!!errors[field]} // Hiển thị lỗi nếu có
                helperText={errors[field]} // Thông báo lỗi dưới input
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#e2e8f0" },
                  "& .MuiInputBase-input": { color: "#e2e8f0" },
                  "& .MuiOutlinedInput-root:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#7f8fa6" },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 3 }}>
          {isEditing ? (
            <Button
              variant="outlined"
              onClick={handleCancelClick}
              sx={{
                color: "#d32f2f", // Màu chữ đỏ cho nút "Hủy bỏ"
                borderColor: "#d32f2f", // Màu viền đỏ
                "&:hover": {
                  backgroundColor: "#815137", // Màu nền nhạt khi hover
                  borderColor: "#d32f2f",
                },
              }}
            >
              Hủy bỏ
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleEditClick}
              sx={{
                color: "#1976d2", // Màu chữ xanh cho nút "Chỉnh sửa thông tin"
                borderColor: "#1976d2", // Màu viền xanh
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: "#245688", // Màu nền nhạt khi hover
                },
              }}
            >
              Chỉnh sửa thông tin
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={handleSaveClick}
            disabled={isSaveDisabled}
            sx={{
              backgroundColor: isSaveDisabled ? "#bdbdbd" : "#2F363F", // Màu xám khi bị disable, màu xanh khi hoạt động
              borderColor: isSaveDisabled ? "#bdbdbd" : "#1DD1A1",
              color: isSaveDisabled ? "#ffffff" : "#1DD1A1", // Màu chữ trắng
              "&:hover": {
                backgroundColor: isSaveDisabled ? "#bdbdbd" : "#268470", // Màu nền đậm hơn khi hover
              },
            }}
          >
            Lưu
          </Button>
        </Box>
      </Card>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default General;
