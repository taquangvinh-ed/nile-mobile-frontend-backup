import { Card, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

const SpecificationsCard = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:8081/api/admin/product/id/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product details");
          }
          return response.json();
        })
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [productId]);

  return (
    <Card sx={{ padding: "16px", borderRadius: "15px 15px 0px 0px", backgroundColor: "#212529", color: "#e2e8f0" }}>
      {product ? (
        <>
          <Typography variant="h5" sx={{ marginBottom: "16px"}}>
            Specifications
          </Typography>
          <Grid container spacing={2}>
            {/* Render each specification as a row */}
            <Grid item xs={4}>
              <Typography>Brand:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{product.brand}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Series:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.series}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Screen Size:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.screenSize} inches</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Display Tech:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.displayTech}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Refresh Rate:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.refreshRate}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Resolution:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.resolution}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Front Camera:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.frontCamera}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Back Camera:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.backCamera}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Chipset:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.chipset}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >CPU:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.cpu}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >GPU:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.gpu}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Battery Capacity:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.batteryCapacity}mAh</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Charging Port:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.chargingPort}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Operate System:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.os}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Size:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.productSize}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Weight:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.productWeight}g</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography  >Description:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography  >{product.description}</Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography  >Loading product details...</Typography>
      )}
    </Card>
  );
};

export default SpecificationsCard;