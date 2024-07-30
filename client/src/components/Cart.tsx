import { FC, useRef, useState } from "react";
import Comment from "./Comment";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";

interface CartProps {
  id: number;
  title: string;
  author: string;
  content: string;
}

const Cart: FC<CartProps> = ({ id, title, author, content }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const refInput = useRef<HTMLInputElement>(null);

  const addCommentHandler = async () => {
    const res = await axios.post(`${SERVER_URL}postComment`, {
      text: refInput.current?.value,
      blogId: id,
    });

    console.log(res);
  };

  const deleteBlogHandle = async () => {
    const res = await axios.delete(`${SERVER_URL}deleteBlog/${id}`);
    console.log(res);
  };

  return (
    <div className="relative mb-4 w-[70%] rounded-lg border border-gray-200 bg-white p-6 font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:text-gray-200">
      <div>
        <h2 className="mb-2 text-xl font-semibold uppercase text-lime-600">
          <span>{id}. </span>
          {title}
        </h2>
        {toggle && (
          <div>
            <p className="mb-2">
              <span className="font-medium text-red-500">Author:</span> {author}
            </p>
            <p className="break-words">
              <span className="font-medium text-blue-500">Content:</span>
              {content}
            </p>
            <hr />

            <div className="flex w-full flex-col justify-center space-y-5 pt-3">
              <div className="mx-auto">
                <input
                  ref={refInput}
                  type="text"
                  className="border-2 border-gray-300 p-[6px] text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={addCommentHandler}
                  className="rounded bg-blue-400 p-2 font-semibold text-white"
                >
                  Add Comment
                </button>
              </div>
              <div className="w-full rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-8 shadow-2xl">
                <h2 className="mb-4 text-center text-4xl font-extrabold text-gray-800">
                  Comments
                </h2>
                <Comment id={id} />
              </div>
            </div>
          </div>
        )}
      </div>
      <button onClick={deleteBlogHandle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-14 top-6 size-8 cursor-pointer hover:scale-110 hover:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      <div onClick={() => setToggle((prev) => !prev)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute right-3 top-6 size-8 cursor-pointer hover:scale-110 hover:text-gray-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
};

export default Cart;
