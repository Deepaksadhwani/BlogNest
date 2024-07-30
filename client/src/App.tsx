import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { SERVER_URL } from "./utils/constants";
import Cart from "./components/Cart";
import Shimmer from "./utils/Shimmer";

const App = () => {
  const refTitle = useRef<HTMLInputElement>(null);
  const refAuthor = useRef<HTMLInputElement>(null);
  const refContent = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [blogList, setBlogList] = useState<
    { id: number; title: string; author: string; content: string }[]
  >([]);



  const getBlogs = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}getBlog`);
      setBlogList(res.data.data);
      console.log(res.data);
      console.log(blogList);
    } catch (error) {
      console.error(error);
    }
  };

  const addBlogHandler = async () => {
    setLoading(true);
    if (refTitle.current && refAuthor.current && refContent.current) {
      const blogPost = {
        id: blogList[blogList.length - 1]?.id + 1 || 1,
        title: refTitle.current.value,
        author: refAuthor.current.value,
        content: refContent.current.value,
      };
      console.log(blogPost);

      try {
        const res = await axios.post(`${SERVER_URL}postBlog`, blogPost);
        console.log("Blog posted successfully:", res.data);

        setBlogList([...blogList, blogPost]);
        refTitle.current.value = "";
        refAuthor.current.value = "";
        refContent.current.value = "";
        getBlogs();
      } catch (error) {
        console.error("Error posting blog:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } else {
      setLoading(false);
      console.error("One or more refs are null");
    }
  };

  useEffect(() => {
    setLoading(false);
    getBlogs();
  }, []);

  return loading ? (
    <Shimmer />
  ) : (
    <div className="relative flex min-h-screen flex-col items-center bg-gradient-to-bl from-gray-700 via-blue-200 to-gray-700 p-6">
      
      <div className="mb-6 w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Create a Blog Post
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              ref={refTitle}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              ref={refAuthor}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              ref={refContent}
              className="mt-1 block h-40 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={addBlogHandler}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center">
        {blogList &&
          blogList.map((blog) => (
            <Cart
              key={blog.id}
              id={blog.id}
              onfetchblog={getBlogs}
              title={blog.title}
              author={blog.author}
              content={blog.content}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
