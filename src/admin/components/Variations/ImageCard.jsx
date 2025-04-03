import { Card, CardMedia } from "@mui/material";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import React from "react";

const ImageCard = ({ variations, selectedVariationIndex }) => {
  return (
    <Card
      sx={{
        width: "275px",
        height: "275px",
        borderRadius: "15px",
        backgroundColor: "#282f36",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {variations[selectedVariationIndex]?.imageURL ? (
        <CardMedia
          component="img"
          image={variations[selectedVariationIndex].imageURL}
          alt={variations[selectedVariationIndex].name}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
          }}
        />
      ) : (
        <div style={{ color: "#e2e8f0", textAlign: "center", fontWeight: "bold" }}>
            <ImageNotSupportedIcon sx={{ fontSize: 250 }} />
        </div>
      )}
    </Card>
  );
};

export default ImageCard;