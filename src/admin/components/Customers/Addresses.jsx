import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

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
                padding: 2,
                backgroundColor: "#2F363F",
                color: "#e2e8f0",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              {/* Dòng chữ "Default" */}
              {address.isDefault && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#4caf50",
                    color: "#ffffff",
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
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    color: "#ffffff",
                  }}
                >
                  {address.addressLine}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    color: "#ffffff",
                  }}
                >
                  {address.ward}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    color: "#ffffff",
                  }}
                >
                  {address.district}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 1,
                    color: "#ffffff",
                  }}
                >
                  {address.province}
                </Typography>
                {/* Full Name */}
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 2,
                    marginBottom: 1,
                    color: "#94a3b8"
                  }}
                >
                  <Person2OutlinedIcon sx={{marginRight: "5px"}} fontSize="small"/>
                  {address.lastName} {address.firstName}
                </Typography>
                {/* Phone Number */}
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#94a3b8"
                  }}
                >
                  <LocalPhoneOutlinedIcon sx={{marginRight: "5px"}} fontSize="small"/>
                  {address.phoneNumber}
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