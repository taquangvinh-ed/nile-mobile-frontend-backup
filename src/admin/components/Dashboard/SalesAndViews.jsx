import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Sales',
            data: [10, 50, 60, 30, 20, 40, 50, 30, 20, 25, 35, 45],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
        },
        {
            label: 'Views',
            data: [20, 40, 50, 20, 30, 50, 60, 40, 30, 45, 55, 65],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const SalesAndViews = () => {
    return (
        <Card sx={{ bgcolor: "#0f1539", color: "white", borderRadius:5 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Sales & Views
                </Typography>
                <Bar data={data} options={options} height={85} />
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    <Grid item xs={6}>
                        <Typography variant="h6">Monthly</Typography>
                        <Typography variant="h4">65,127</Typography>
                        <Typography variant="body2" color="grey">16.5% 55.21 USD</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Yearly</Typography>
                        <Typography variant="h4">984,246</Typography>
                        <Typography variant="body2" color="grey">24.9% 267.35 USD</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
export default SalesAndViews;