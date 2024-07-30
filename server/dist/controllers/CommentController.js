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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.deleteComment = exports.fetchCommentForBlog = exports.insertComment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertComment = (text, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.comment.create({
        data: {
            text,
            blogId,
        },
    });
    return res;
});
exports.insertComment = insertComment;
const fetchCommentForBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.comment.findMany({
        where: {
            blogId,
        },
    });
    return res;
});
exports.fetchCommentForBlog = fetchCommentForBlog;
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.comment.delete({
        where: {
            id,
        },
    });
    return res;
});
exports.deleteComment = deleteComment;
const updateComment = (id, newText) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.comment.update({
        where: {
            id,
        },
        data: {
            text: newText,
        },
    });
    return res;
});
exports.updateComment = updateComment;
