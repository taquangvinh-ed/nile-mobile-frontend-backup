import { Grid } from "@mui/material";
import React from "react";
import DeleteProduct from "./DeleteProduct";
const ToolbarProduct = () => {
  return (
    <Grid container sx={{ bgcolor: "#282f36", padding: "16px 75px", borderRadius: "15px", justifyContent: "end" }}>
        <DeleteProduct />
    </Grid>
  );
}
export default ToolbarProduct;