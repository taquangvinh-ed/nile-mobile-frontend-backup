import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Rating } from "@mui/material";
const InputPersionalnfor = ({ rating }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  return (
    <form>
      <div className="flex flex-col  w-[62rem]">
        <div className="space-y-4 space-x-2 mx-2">
          <input
            required
            type="text"
            placeholder="Họ tên*"
            value={name}
            className="w-[20rem] h-[2rem] border rounded-lg shadow-lg ml-2"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            required
            type="text"
            placeholder="Số điện thoại*"
            value={phone}
            className="w-[15rem] h-[2rem] border rounded-lg shadow-lg"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Email"
            value={email}
            className="w-[20rem] h-[2rem] border rounded-lg shadow-lg"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {rating ? (
            <div className="flex justify-start items-center text-lg font-semibold">
              <p>Đánh giá của bạn </p>
              <Rating className="text-lg px-4" />
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
            className="w-[60rem] h-[8rem] border rounded-lg shadow-lg"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mx-4 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl px-4 py-1 cursor-pointer">
            Gửi bình luận <SendIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputPersionalnfor;
