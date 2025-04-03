import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Button, Card, CardContent, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import Addresses from "./Addresses";
import Orders from "./Orders";
import Cart from "./Cart";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import General from "./General";

const UserPage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState("General");

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
        setUserName(`${data.lastName} ${data.firstName}`);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Hàm để render nội dung dựa trên nút được chọn
  const renderContent = () => {
    switch (selectedContent) {
      case "General":
        return <General />;
      case "Addresses":
        return <Addresses />;
      case "Orders":
        return <Orders />;
      case "Cart":
        return <Cart />;
      case "Payment Methods":
        return <div>Payment Methods content goes here...</div>;
      case "Reviews":
        return <div>Reviews content goes here...</div>;
      case "Account Settings":
        return <div>Account Settings content goes here...</div>;
      default:
        return <div>Select an option to view content</div>;
    }
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {/* User Info Section */}
      <Grid item xs={12} md={3}>
        <Card sx={{ backgroundColor: "#212529", borderRadius: "10px", color: "#e2e8f0" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                backgroundColor: "#475569",
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: "bold" }}>
              {userName}
            </Typography>
            {/* Buttons Section */}
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column", // Sắp xếp các nút theo chiều dọc
                gap: 2, // Khoảng cách giữa các nút
              }}
            >
              {[
                { label: "General", value: "General", icon: <HomeIcon /> },
                { label: "Orders", value: "Orders", icon: <ListAltIcon /> },
                { label: "Cart", value: "Cart", icon: <ShoppingCartIcon /> },
                { label: "Payment Methods", value: "Payment Methods", icon: <PaymentIcon /> },
                { label: "Reviews", value: "Reviews", icon: <StarBorderIcon /> },
                { label: "Addresses", value: "Addresses", icon: <LocationOnIcon /> },
                { label: "Account Settings", value: "Account Settings", icon: <SettingsIcon /> },
              ].map((action, index) => (
                <Button
                  key={index}
                  startIcon={action.icon}
                  variant={selectedContent === action.value ? "contained" : "outlined"}
                  sx={{
                    justifyContent: "flex-start",
                    backgroundColor: selectedContent === action.value ? "#1976d2" : "#334155",
                    color: selectedContent === action.value ? "#ffffff" : "#e2e8f0",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: selectedContent === action.value ? "#1565c0" : "#475569",
                    },
                  }}
                  onClick={() => setSelectedContent(action.value)}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Dynamic Content Section */}
      <Grid item xs={12} md={9}>
        <Card sx={{ backgroundColor: "#212529", borderRadius: "10px", padding: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2, color: "#e2e8f0", fontWeight: "bold" }}>
              {selectedContent}
            </Typography>
            {renderContent()}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserPage;
