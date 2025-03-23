import { Card, Typography, Button, Box } from "@mui/material";
import React, { useState } from "react";

const NameCard = ({ variations, setSelectedVariationIndex }) => {
  const [selectedVariationIndex, setLocalSelectedVariationIndex] = useState(0);

  const handleVariationChange = (index) => {
    setLocalSelectedVariationIndex(index);
    setSelectedVariationIndex(index);
  };
  return (
    <Card sx={{ padding: "16px", borderRadius: "15px", backgroundColor: "#282f36", color: "#e2e8f0" }}>
      <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
        {variations[selectedVariationIndex]
          ? `${variations[selectedVariationIndex].name} ${variations[selectedVariationIndex].color} ${variations[selectedVariationIndex].ram}/${variations[selectedVariationIndex].rom}`
          : "No Variation Selected"}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
        {variations.map((variation, index) => (
          <Button
            key={variation.variationId}
            variant={selectedVariationIndex === index ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleVariationChange(index)}
            sx={{
              textTransform: "none",
              backgroundColor: selectedVariationIndex === index ? "#475569" : "transparent",
              color: selectedVariationIndex === index ? "#ffffff" : "#94a3b8",
              "&:hover": {
                backgroundColor: "#64748b",
                color: "#ffffff",
              },
            }}
          >
            {`${variation.color} ${variation.ram}/${variation.rom}`}
          </Button>
        ))}
      </Box>
      {/* Display Price, Discount Percent, and Discount Price */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
          padding: "0 16px",
        }}
      >
        <Typography variant="body1" sx={{ color: "#e2e8f0" }}>
          Price: {variations[selectedVariationIndex]?.price || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ color: "#e2e8f0" }}>
          Discount Percent: {variations[selectedVariationIndex]?.discountPercent || "N/A"}%
        </Typography>
        <Typography variant="body1" sx={{ color: "#e2e8f0" }}>
          Discount Price: {variations[selectedVariationIndex]?.discountPrice || "N/A"}
        </Typography>
      </Box>
    </Card>
  );
};

export default NameCard;