import React, { useState, useEffect } from "react";
import { Card, Typography, Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByBrand = () => {
  const [chartData, setChartData] = useState(null);

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

        // Tính tổng số lượng của từng hãng
        const brandCounts = {};
        completedOrders.forEach((order) => {
          order.orderDetails.forEach((detail) => {
            const brand = detail.variationName.split(" ")[0]; // Lấy chữ đầu tiên trong tên variationName
            brandCounts[brand] = (brandCounts[brand] || 0) + detail.quantity;
          });
        });

        // Chuẩn bị dữ liệu cho biểu đồ
        const labels = Object.keys(brandCounts);
        const data = Object.values(brandCounts);
        const backgroundColors = [
          "#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6", 
          "#1abc9c", "#e67e22", "#34495e"
        ]; // Màu sắc cho tối đa 8 hãng

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
      } catch (error) {
        console.error("Error fetching orders:", error);
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
        {chartData ? <Doughnut data={chartData} options={options} /> : <Typography>Loading...</Typography>}
      </Box>
    </Card>
  );
};

export default SalesByBrand;