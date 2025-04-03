import React, { useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatus = () => {
  const  setPercentage = useState(68);
  const setSelectedIndex = useState(0);

  const data = {
    labels: ["Sales", "Product", "Income"],
    datasets: [
      {
        data: [68, 25, 14],
        backgroundColor: ["#3498db", "#e74c3c", "#2ecc71"],
        hoverBackgroundColor: ["#2980b9", "#c0392b", "#27ae60"],
        borderWidth: 1,
        cutout: '0%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    // onClick: (event, elements) => {
    //   if (elements.length > 0) {
    //     const index = elements[0].index;
    //     setSelectedIndex(index);
    //     setPercentage(data.datasets[0].data[index]);
    //   }
    // },
  };

  return (
    <Card sx={{ bgcolor: "#212529", color: "white", padding: 2, height: '100%', borderRadius:5}}>
      <Typography variant="h6" gutterBottom>
        Order Status
      </Typography>
      <Box sx={{ position: 'relative', height: '300px' }}>
        <Doughnut data={data} options={options} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#3498db' }}>● Sales</Typography>
          <Typography variant="body2">68%</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#e74c3c' }}>● Product</Typography>
          <Typography variant="body2">25%</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#2ecc71' }}>● Income</Typography>
          <Typography variant="body2">14%</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default OrderStatus;