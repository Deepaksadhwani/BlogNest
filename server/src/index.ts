import express from "express";
import cors from "cors";
import { fetchBlog, insertBlog } from "./controllers/blogController";
import { blogSchema } from "./types";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/getBlog", async (req, res) => {
  try {
    const data = await fetchBlog();
    res.status(200).json({ data: data });
  } catch (error) {
    console.error(error);
    res.status(404).json({ Message: "invalid input." });
  }
});

app.post("/postBlog", (req, res) => {
  try {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed });
    }
    const { title, author, content } = req.body;
    insertBlog(title, author, content);
    res.status(201).json({
      message: "successfully added",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add blog" });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
