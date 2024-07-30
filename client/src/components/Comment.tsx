import { FC, useEffect } from "react";

interface commentProp {
  blogId: number
}
const Comment:FC<commentProp> = ({blogId}) => {

  const fetchComment = async () => {
    
  }

  useEffect(() => {
    
  })

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Comments</h2>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-start">
            <img
              src="https://via.placeholder.com/60"
              alt="User"
              className="w-16 h-16 rounded-full border-4 border-blue-400 mr-4"
            />
            <div className="flex-1">
              <p className="text-gray-900 text-xl font-semibold">Deepak sadhwani</p>
              <p className="text-gray-700 mt-2 text-lg">
                This is a comment. It looks great! The design of this component is clean and modern.
              </p>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Comment;
