"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blogController_1 = require("./controllers/blogController");
const types_1 = require("./types");
const CommentController_1 = require("./controllers/CommentController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/// blog related operation
app.get("/getBlog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, blogController_1.fetchBlog)();
        res.status(200).json({ data: data });
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ Message: "invalid input." });
    }
}));
app.post("/postBlog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = types_1.blogSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ message: parsed });
        }
        const { title, author, content } = req.body;
        yield (0, blogController_1.insertBlog)(title, author, content);
        res.status(201).json({
            message: "successfully added",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add blog" });
    }
}));
app.delete("/deleteBlog/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const intId = parseInt(id);
    console.log(intId);
    try {
        const response = yield (0, blogController_1.deleteBlog)(intId);
        res.status(200).json({ message: "successfully deleted", data: response });
    }
    catch (error) {
        res.status(404).json({ message: "Invalid input found." });
    }
}));
//comment related operation
app.post("/postComment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = types_1.commentSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: parsed });
    }
    const { blogId, text } = req.body;
    try {
        const newComment = yield (0, CommentController_1.insertComment)(text, blogId);
        res
            .status(201)
            .json({ message: "Comment created successfully", Comment: newComment });
    }
    catch (error) {
        console.error("Error inserting comment", error);
        res.status(500).json("Internal server error.");
    }
}));
app.get("/fetchComment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.body;
    const Comments = yield (0, CommentController_1.fetchCommentForBlog)(blogId);
    try {
        res.status(200).json({ message: "successfully fetched", data: Comments });
    }
    catch (error) {
        res.status(400).json({ message: "invalid input found." });
    }
}));
app.delete("/deleteComment/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const parsedId = parseInt(id);
    try {
        const response = yield (0, CommentController_1.deleteComment)(parsedId);
        console.log(response);
        res.status(200).json({
            message: "Comment has been successfully deleted",
            data: response,
        });
    }
    catch (error) {
        res.status(400).json({ message: "invalid input found." });
    }
}));
// app.put("/editComment", async (req, res) => {
//   const parsed = EditSchema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json({ message: parsed });
//   }
//   const { id, text } = req.body;
//   const response = await updateComment(id, text);
//   res.status(200).json({ message: "successfully edited.", data: response });
// });
app.listen(3000);
