import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel, Grid } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần cần thiết của chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesAndViews = () => {
  const [chartData, setChartData] = useState(null);
  const [viewMode, setViewMode] = useState("month"); // "month", "day", hoặc "year"
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Tháng hiện tại
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Năm hiện tại

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const recentYears = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i); // 10 năm gần nhất

  // Fetch và xử lý dữ liệu
  useEffect(() => {
    const fetchOrders = async () => {
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

        // Chuyển đổi dữ liệu dựa trên chế độ hiển thị
        const groupedData = {};
        completedOrders.forEach((order) => {
          const [time, date] = order.orderDate.split(" ");
          const [day, month, year] = date.split("-");
          let key;

          if (viewMode === "day" && parseInt(month) === selectedMonth && parseInt(year) === selectedYear) {
            key = day; // Chỉ hiển thị ngày
          } else if (viewMode === "month" && parseInt(year) === selectedYear) {
            key = month; // Chỉ hiển thị tháng
          } else if (viewMode === "year") {
            key = year; // Chỉ hiển thị năm
          }

          if (key) {
            groupedData[key] = (groupedData[key] || 0) + order.totalPrice;
          }
        });

        // Sắp xếp nhãn và dữ liệu theo thứ tự tăng dần
        const sortedKeys = Object.keys(groupedData).sort((a, b) => parseInt(a) - parseInt(b));
        const sortedData = sortedKeys.map((key) => groupedData[key]);

        // Chuẩn bị dữ liệu cho biểu đồ
        setChartData({
          labels: sortedKeys,
          datasets: [
            {
              label: "Total Sales",
              data: sortedData,
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [viewMode, selectedMonth, selectedYear]); // Chạy lại khi viewMode, selectedMonth hoặc selectedYear thay đổi

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Reusable styles for dropdowns
  const dropdownStyles = {
    bgcolor: "#343A40",
    border: "1px solid #495057",
    borderRadius: 3,
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    color: "#d3d7dc",
    "& .MuiSelect-icon": {
      color: "#d3d7dc",
    },
  };

  const menuItemStyles = {
    color: "#d3d7dc",
    "&:hover": { bgcolor: "#495057" },
    "&.Mui-selected": { bgcolor: "#6C757D", color: "#fff" },
    "&.Mui-selected:hover": { bgcolor: "#6C757D" },
  };

  return (
    <Card sx={{ bgcolor: "#212529", color: "white", borderRadius: 5 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sales & Views
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          {/* Dropdown chọn chế độ hiển thị */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small" sx={dropdownStyles}>
              <InputLabel id="view-mode-label" sx={{ color: "#d3d7dc" }}>
                View Mode
              </InputLabel>
              <Select
                labelId="view-mode-label"
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
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
                sx={{
                    color: "#d3d7dc",
                    "& .MuiSelect-icon": {
                      color: "#d3d7dc",
                    },
                  }}
              >
                <MenuItem value="month" sx={menuItemStyles}>
                  By Month
                </MenuItem>
                <MenuItem value="day" sx={menuItemStyles}>
                  By Day
                </MenuItem>
                <MenuItem value="year" sx={menuItemStyles}>
                  By Year
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Dropdown chọn tháng nếu viewMode là "day" */}
          {viewMode === "day" && (
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small" sx={dropdownStyles}>
                <InputLabel id="month-select-label" sx={{ color: "#d3d7dc" }}>
                  Select Month
                </InputLabel>
                <Select
                  labelId="month-select-label"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
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
                  sx={{
                    color: "#d3d7dc",
                    "& .MuiSelect-icon": {
                      color: "#d3d7dc",
                    },
                  }}
                >
                  {monthNames.map((month, index) => (
                    <MenuItem key={index + 1} value={index + 1} sx={menuItemStyles}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {/* Dropdown chọn năm nếu viewMode là "day" hoặc "month" */}
          {(viewMode === "day" || viewMode === "month") && (
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small" sx={dropdownStyles}>
                <InputLabel id="year-select-label" sx={{ color: "#d3d7dc" }}>
                  Select Year
                </InputLabel>
                <Select
                  labelId="year-select-label"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
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
                  sx={{
                    color: "#d3d7dc",
                    "& .MuiSelect-icon": {
                      color: "#d3d7dc",
                    },
                  }}
                >
                  {recentYears.map((year) => (
                    <MenuItem key={year} value={year} sx={menuItemStyles}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>

        {chartData ? <Bar data={chartData} options={options} height={85} /> : <Typography>Loading...</Typography>}
      </CardContent>
    </Card>
  );
};

export default SalesAndViews;
