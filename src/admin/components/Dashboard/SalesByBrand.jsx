import React, { useState, useEffect } from "react";
import { Card, Typography, Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByBrand = () => {
  const [chartData, setChartData] = useState(null);
  const [hasData, setHasData] = useState(true); // Trạng thái kiểm tra dữ liệu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/admin/orders/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const orders = await response.json();

        // Lọc các đơn hàng có trạng thái COMPLETED
        const completedOrders = orders.filter((order) => order.status === "COMPLETED");

        if (completedOrders.length === 0) {
          setHasData(false); // Không có đơn hàng
          return;
        }

        // Tính tổng số lượng của từng hãng
        const brandCounts = {};
        completedOrders.forEach((order) => {
          order.orderDetails.forEach((detail) => {
            const brand = detail.brand;
            brandCounts[brand] = (brandCounts[brand] || 0) + detail.quantity;
          });
        });

        if (Object.keys(brandCounts).length === 0) {
          setHasData(false); // Không có dữ liệu hãng
          return;
        }

        // Chuẩn bị dữ liệu cho biểu đồ
        const labels = Object.keys(brandCounts);
        const data = Object.values(brandCounts);
        const backgroundColors = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6", "#1abc9c", "#e67e22", "#34495e"]; // Màu sắc cho tối đa 8 hãng

        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: backgroundColors.slice(0, labels.length),
              hoverBackgroundColor: backgroundColors.slice(0, labels.length).map((color) => color + "CC"), // Thêm độ trong suốt khi hover
              borderWidth: 1,
              cutout: "0%",
            },
          ],
        });
        setHasData(true); // Có dữ liệu
      } catch (error) {
        console.error("Error fetching orders:", error);
        setHasData(false); // Lỗi khi fetch dữ liệu
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <Card sx={{ bgcolor: "#212529", color: "white", padding: 2, height: "100%", borderRadius: 5 }}>
      <Typography variant="h6" gutterBottom>
        Pie Chart of Sales by Brand
      </Typography>
      <Box sx={{ position: "relative", height: "300px" }}>
        {hasData ? (
          chartData ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <Typography>Loading...</Typography>
          )
        ) : (
          <Typography align="center">No data available to display.</Typography>
        )}
      </Box>
    </Card>
  );
};

export default SalesByBrand;
