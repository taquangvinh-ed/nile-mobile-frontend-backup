import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
const Bookmark = () => {
  const [isSelected, setIsSelected] = useState(false);
  const handleBookmark = () => {
    setIsSelected(!isSelected);
  };
  return (
    <div>
      <span onClick={handleBookmark}>
        {isSelected ? (
          <BookmarkIcon style={{ color: "#FFD700" }} />
        ) : (
          <BookmarkBorderIcon style={{ color: "blacks" }} />
        )}
      </span>
    </div>
  );
};

export default Bookmark;
