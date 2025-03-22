import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";

const TrignleImg = styled("img")({
    right:0,
    bottom:0,
    height:170,
    position:"absolute"
})
const TrophyImg = styled("img")({
    right:36,
    bottom:20,
    height:98,
    position:"absolute"
})

const Achivement = () => {
    return (
        <Card sx={{position:"relative", bgcolor:"#0f1539", color:"white", borderRadius:5}}>
            <CardContent>
                <Typography variant="h6" sx={{letterSpacing:".25px"}}>
                    Nile Mobile Store
                </Typography>
                <Typography variant="body2">Congratulations</Typography>
                <Typography variant="h5" sx={{my:3.1}}>420.8k</Typography>
                <Button size="small" variant="contained">View Sales</Button>
                <TrignleImg src=""></TrignleImg>
                <TrophyImg src="/images/TrophyImg.png"/>
            </CardContent>
        </Card>
    )
}
export default Achivement