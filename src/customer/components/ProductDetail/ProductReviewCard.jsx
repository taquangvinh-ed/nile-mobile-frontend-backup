import { Avatar, Box, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-2">
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 50, height: 50, bgcolor: "#915fd" }}
            >
              V
            </Avatar>
          </Box>
        </div>
        <div className="col-span-10">
          <div className="space-y-2">
            <div className="flex flex-col">
              <p className="font-semibold text-lg">Nguyễn Văn A</p>
              <p className="opacity-40">2 ngày trước</p>
            </div>
          </div>
          <Rating value={4.5} name="rating" readOnly precision={0.1} />
          <p>Sản phẩm tốt</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
