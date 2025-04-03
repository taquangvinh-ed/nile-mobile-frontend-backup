import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, Grid, CircularProgress } from "@mui/material";

const General = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

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
    return (
      <Typography sx={{ color: "#94a3b8", textAlign: "center", marginTop: 4, fontSize: "1.2rem" }}>
        No user information found.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2}}>
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#2F363F",
          padding: 4,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#94a3b8", fontSize: "1rem" }}>
              User ID:
            </Typography>
            <Typography variant="body2" sx={{ color: "#e2e8f0", fontSize: "0.95rem" }}>
              {user.userId}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#94a3b8", fontSize: "1rem" }}>
              Email:
            </Typography>
            <Typography variant="body2" sx={{ color: "#e2e8f0", fontSize: "0.95rem" }}>
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#94a3b8", fontSize: "1rem" }}>
              Last Name:
            </Typography>
            <Typography variant="body2" sx={{ color: "#e2e8f0", fontSize: "0.95rem" }}>
              {user.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#94a3b8", fontSize: "1rem" }}>
            First Name:
            </Typography>
            <Typography variant="body2" sx={{ color: "#e2e8f0", fontSize: "0.95rem" }}>
              {user.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#94a3b8", fontSize: "1rem" }}>
              Phone Number:
            </Typography>
            <Typography variant="body2" sx={{ color: "#e2e8f0", fontSize: "0.95rem" }}>
              {user.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#94a3b8", fontSize: "1rem" }}>
              Created At:
            </Typography>
            <Typography variant="body2" sx={{ color: "#e2e8f0", fontSize: "0.95rem" }}>
              {user.createdDateAt}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default General;