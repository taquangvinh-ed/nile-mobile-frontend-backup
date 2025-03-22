import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../State/Auth/Action";
const InputPersionalnfor = ({ rating, variationId }) => {
  const [content, setContent] = useState("");
  const [ratingValue, setRatingValue] = useState(1);
  const dispatch = useDispatch();
  const { reviewLoading, reviewError, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please login to submit a review");
      return;
    }

    const reviewData = {
      variationId: variationId,
      content: content,
      rating: ratingValue,
    };

    console.log(reviewData);

    try {
      const result = await dispatch(createReview(reviewData));
      if (result.success) {
        alert("Review submitted successfully!");
        setContent("");
        setRatingValue(1);
      } else {
        alert("Failed to submit review: " + result.error);
      }
    } catch (error) {
      alert("An error occurred while submitting review");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col  w-[62rem]">
        <div className="space-y-4 space-x-2 mx-2">
          {rating ? (
            <div className="flex justify-start items-center text-lg font-semibold">
              <p>Đánh giá của bạn </p>
              <Rating
                value={ratingValue}
                onChange={(event, newValue) => setRatingValue(newValue || 1)}
                precision={1}
                className="text-lg px-4"
              />
            </div>
          ) : (
            ""
          )}
          <textarea
            wrap="soft"
            required
            type="text"
            placeholder="Nội dung*"
            value={content}
            className="w-[60rem] h-[8rem] border rounded-lg shadow-lg hover:border-green-500 focus:outline-green-600"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mx-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl px-4 py-1 cursor-pointer"
          >
            {reviewLoading ? "Đang gửi..." : "Gửi bình luận"} <SendIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputPersionalnfor;
