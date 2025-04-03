import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrignleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});
const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Achivement = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/user/get-all-users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        if (Array.isArray(response.data)) {
          setTotalUsers(response.data.length);
        }
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  const handleViewDetails = () => {
    navigate("/admin/customers");
  };

  return (
    <Card sx={{ position: "relative", bgcolor: "#212529", color: "white", borderRadius: 5 }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Nile Mobile Store
        </Typography>
        <Typography variant="body2">Total users</Typography>
        <Typography variant="h5" sx={{ my: 3.1 }}>
          {totalUsers}
        </Typography>
        <Button size="small" variant="contained" onClick={handleViewDetails}>
          View Details
        </Button>
        <TrignleImg src=""></TrignleImg>
        <TrophyImg src="/images/TrophyImg.png" />
      </CardContent>
    </Card>
  );
};

export default Achivement;
