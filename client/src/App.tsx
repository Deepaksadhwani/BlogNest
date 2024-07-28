import { useRef, useState } from "react";

const App = () => {
  const refTitle = useRef(null);
  const refAuthor = useRef(null);
  const refContent = useRef(null);
  const [blogList,setBlogList] = useState([]);
  return (
    <div>
      <div>
        <label htmlFor="">Title</label>
        <input type="text" ref={refTitle} />
        <label htmlFor="">Author</label>
        <input type="text" ref={refAuthor} />
        <label htmlFor="">Content</label>
        <input type="text" ref={refContent} />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default App;
