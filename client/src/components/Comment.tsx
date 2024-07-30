import { SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface commentProp {
  id: number;
  onGetData: (func: () => void) => void;
}
const Comment: FC<commentProp> = ({ id, onGetData }) => {
  const [commentList, setCommentList] = useState<
    { id: number; text: string; blogId: number }[]
  >([]);

  const fetchComments = async () => {
    const response = await axios.get(`${SERVER_URL}fetchComment`, {
      params: { blogId: id },
    });
    const filterList = response.data.data.filter(
      (commentData: any) => commentData.blogId == id,
    );

    setCommentList(filterList);
  };

  const deleteCommentHandler = async (id: number) => {
    const response = await axios.delete(`${SERVER_URL}deleteComment/${id}`);
    fetchComments();
    console.log(response);
  };

  onGetData(fetchComments);

  useEffect(() => {
    fetchComments();
  }, []);
  console.log(id);
  console.log(commentList);
  return (
    <div className="transform rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
      <div className="flex items-start">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_wEF7ozJNdb34CDG7YSR62iuRtC4e7wR2jA&s"
          alt="User"
          className="mr-4 h-16 w-16 rounded-full border-4 border-blue-400"
        />
        <div className="flex-1">
          <p className="text-xl font-semibold text-gray-900">Damini</p>
          {commentList &&
            commentList.map((comment) => (
              <div
                key={comment.id}
                className="flex justify-between rounded border border-b-gray-400 p-1 px-2 shadow-md"
              >
                <p className="mt-2 text-lg text-gray-700">{comment.text}</p>
                <div className="flex space-x-2">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-blue-400 hover:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>

                  <button onClick={() => deleteCommentHandler(comment.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-red-400 hover:scale-110"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
