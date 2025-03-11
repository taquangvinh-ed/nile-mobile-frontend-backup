import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";

const StarRating = ({ rating }) => {
  const stars = Array(5).fill(0);
  return (
    <div className="flex justify-start">
      {stars.map((_, index) => (
        <span
          key={index}
          style={{ color: index < rating ? "#FFD700" : "transparent" }}
        >
          {index < rating ? (
            <StarRateIcon />
          ) : (
            <StarOutlineIcon style={{ color: "#FFD700" }} />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
