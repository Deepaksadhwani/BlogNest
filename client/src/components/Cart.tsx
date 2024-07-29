import { FC, useState } from "react";

interface CartProps {
  id: number;
  title: string;
  author: string;
  content: string;
}

const Cart: FC<CartProps> = ({ id, title, author, content }) => {
  const [toggle, setToggle] = useState<boolean>(false);
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
            <div className="pt-3 flex justify-center w-full">
              <input type="text" className="focus:outline-none text-black border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 p-[6px]" />
              <button className="rounded bg-blue-400 p-2 font-semibold text-white">
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
      <div onClick={() => setToggle((prev) => !prev)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute right-3 top-6 size-8 cursor-pointer hover:text-gray-200"
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
