import { AccountCircle, TrendingUp } from "@mui/icons-material";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const MonthlyOverview = () => {
  const [salesData, setSalesData] = useState([
    { stats: "Loading...", tittle: "Orders", color: "#E5D68A", icon: <TrendingUp sx={{ fontSize: "1.75rem" }} /> },
    { stats: "Loading...", tittle: "Products", color: "#DE4839", icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} /> },
    { stats: "Loading...", tittle: "Revenue", color: "#12B0E8", icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} /> },
  ]);

  useEffect(() => {
    const fetchData = () => {
      // Fetch total orders
      fetch("http://localhost:8081/api/admin/orders/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((response) => response.json())
        .then((orders) => {
          const totalOrders = orders.length;
          const totalRevenue = orders
            .filter((order) => order.status === "COMPLETED")
            .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

          // Fetch total variations
          fetch("http://localhost:8081/api/admin/variation/get-all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
            .then((response) => response.json())
            .then((variations) => {
              const totalVariations = variations.length;

              // Update sales data
              setSalesData([
                { stats: `${totalOrders}`, tittle: "Orders", color: "#E5D68A", icon: <TrendingUp sx={{ fontSize: "1.75rem" }} /> },
                { stats: `${totalVariations}`, tittle: "Products", color: "#DE4839", icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} /> },
                { stats: `${totalRevenue.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}`, tittle: "Revenue", color: "#12B0E8", icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} /> },
              ]);
            })
            .catch((error) => console.error("Error fetching variations:", error));
        })
        .catch((error) => console.error("Error fetching orders:", error));
    };

    fetchData();
  }, []);

  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: "common.white",
              backgroundColor: `${item.color}`,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">{item.tittle}</Typography>
            <Typography variant="h6">{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  return (
    <Card sx={{ bgcolor: "#212529", color: "white", borderRadius: 5 }}>
      <CardHeader
        title="Overview"
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            An overview of key metrics including total orders, revenue, and available products. 
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: ".15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>{renderStats()}</Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;