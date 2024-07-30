"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = exports.blogSchema = void 0;
const zod_1 = require("zod");
exports.blogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.commentSchema = zod_1.z.object({
    blogId: (0, zod_1.number)(),
    text: (0, zod_1.string)(),
});
