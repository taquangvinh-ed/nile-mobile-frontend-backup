import { Grid } from "@mui/material";
import React from "react";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

const ToolbarProduct = ({ productId, productData }) => {
  return (
    <Grid container sx={{ bgcolor: "#212529", padding: "16px 75px", borderRadius: "0px 0px 15px 15px", justifyContent: "end" }}>
      <Grid item sx={{ marginRight: "20px" }}>
        <UpdateProduct productId={productId} />
      </Grid>
      <Grid item>
        <DeleteProduct />
      </Grid>
    </Grid>
  );
};

export default ToolbarProduct;