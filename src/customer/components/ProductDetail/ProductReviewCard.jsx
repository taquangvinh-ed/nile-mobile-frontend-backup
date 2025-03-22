import { Avatar, Box, Rating } from "@mui/material";
import React from "react";
import moment from "moment";

const ProductReviewCard = ({ review }) => {
  console.log(review);
  const getRelativeTime = (createdAt) => {
    if (!createdAt) return "Không rõ thời gian";
    if (Array.isArray(createdAt)) {
      const [year, month, day, hour, minute, second] = createdAt;
      const date = new Date(year, month - 1, day, hour, minute, second);
      return moment(date).fromNow();
    }
    return moment(createdAt).fromNow();
  };

  const getAvatarInitial = (username) => {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  };

  const getRandomColor = (seed) => {
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
  
    const r = Math.floor(seededRandom(seed + 1) * 256);
    const g = Math.floor(seededRandom(seed + 2) * 256);
    const b = Math.floor(seededRandom(seed + 3) * 256);
  
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const avatarColor = getRandomColor(review?.id || review?.userId || 0);

  return (
    <div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-2">
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 50, height: 50, bgcolor: avatarColor }}
            >
              {getAvatarInitial(review?.username)}
            </Avatar>
          </Box>
        </div>
        <div className="col-span-10">
          <div className="space-y-2">
            <div className="flex flex-col">
              <p className="font-semibold text-lg">
                {review?.username || "Ẩn danh"}
              </p>
              <p className="opacity-40">{getRelativeTime(review?.createdAt)}</p>
            </div>
          </div>
          <Rating
            value={review?.rating || 0}
            name={`rating-${review?.id}`} // Đảm bảo name duy nhất
            readOnly
            precision={1}
          />
          <p>Sản phẩm tốt</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
