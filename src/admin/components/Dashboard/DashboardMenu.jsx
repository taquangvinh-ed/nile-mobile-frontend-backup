import React from "react";
import { Grid } from "@mui/material";
import Achivement from "./Achivement";
import MonthlyOverview from "./MonthlyOverview";
import SalesByBrand from "./SalesByBrand";
import SalesAndViews from "./SalesAndViews";

const DashboardMenu = () => {
    return (
        <div className="p-5">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Achivement/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <MonthlyOverview/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <SalesByBrand/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <SalesAndViews/>
                </Grid>
            </Grid>
        </div>
    )
}
export default DashboardMenu