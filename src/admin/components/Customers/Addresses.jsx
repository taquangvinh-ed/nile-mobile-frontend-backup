import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";

const Addresses = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/api/admin/addresses/user/id/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }
        return response.json();
      })
      .then((data) => {
        setAddresses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ color: "#e57373", textAlign: "center", marginTop: 2 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {addresses.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {addresses.map((address) => (
            <Card
              key={address.addressId}
              sx={{
                position: "relative",
                backgroundColor: "#2F363F", // Nền tối
                color: "#e2e8f0", // Màu chữ sáng
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Dòng chữ "Default" */}
              {address.isDefault && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#4caf50", // Màu xanh lá cho "Default"
                    color: "#ffffff", // Màu chữ trắng
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Default
                </Box>
              )}
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 1,
                    color: "#ffffff", // Màu chữ trắng
                  }}
                >
                  Full Name: {address.lastName} {address.firstName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    color: "#d1d5db", // Màu chữ xám nhạt
                  }}
                >
                  <strong>Address Detail:</strong> {address.addressLine}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    color: "#d1d5db",
                  }}
                >
                  <strong>Ward:</strong> {address.ward}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    color: "#d1d5db",
                  }}
                >
                  <strong>District:</strong> {address.district}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    color: "#d1d5db",
                  }}
                >
                  <strong>Province:</strong> {address.province}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#d1d5db",
                  }}
                >
                  <strong>Phone Number:</strong> {address.phoneNumber}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography
          sx={{
            color: "#94a3b8", // Màu chữ xám nhạt
            textAlign: "center",
          }}
        >
          No addresses found for this user.
        </Typography>
      )}
    </Box>
  );
};

export default Addresses;