import express from "express";
import cors from "cors";
import { fetchBlog, insertBlog } from "./controllers/blogController";
import { blogSchema, commentSchema } from "./types";
import {
  fetchCommentForBlog,
  insertComment,
} from "./controllers/CommentController";

const app = express();
app.use(express.json());
app.use(cors());

/// blog related operation
app.get("/getBlog", async (req, res) => {
  try {
    const data = await fetchBlog();
    res.status(200).json({ data: data });
  } catch (error) {
    console.error(error);
    res.status(404).json({ Message: "invalid input." });
  }
});

app.post("/postBlog", async (req, res) => {
  try {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed });
    }
    const { title, author, content } = req.body;
    await insertBlog(title, author, content);
    res.status(201).json({
      message: "successfully added",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add blog" });
  }
});

//comment related operation

app.post("/postComment", async (req, res) => {
  const parsed = commentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed });
  }
  const { blogId, text } = req.body;

  try {
    const newComment = await insertComment(text, blogId);
    res
      .status(201)
      .json({ message: "Comment created successfully", Comment: newComment });
  } catch (error) {
    console.error("Error inserting comment", error);
    res.status(500).json("Internal server error.");
  }
});

app.get("/fetchComment", async (req, res) => {
  const { blogId } = req.body;
  const Comments = await fetchCommentForBlog(blogId);
  try {
    res.status(200).json({ message: "successfully fetched", data: Comments });
  } catch (error) {
    res.status(400).json({ message: "invalid input found." });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
