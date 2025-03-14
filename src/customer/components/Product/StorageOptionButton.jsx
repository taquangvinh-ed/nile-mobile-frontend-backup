import React from "react";
import "./ProductCard.css";
const StorageOptionButton = ({ label, onClick, isSelected }) => {
  return (
    <div>
      <button
        style={{
          position: "relative",
          marginRight: "3px",
          width: "80px",
          height: "30px",
          padding: "10px 20px",
          backgroundColor: isSelected ? "transparent" : "blue",
          border: "solid 1px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "0.9rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "1rem",
          paddingLeft: "1rem",
        }}
        onClick={onClick}
        className={isSelected ? "buttonIsSelected" : "buttonIsNotSelected"}
      >
        {label}
      </button>
    </div>
  );
};

export default StorageOptionButton;
