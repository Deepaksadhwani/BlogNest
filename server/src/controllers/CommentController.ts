import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertComment = async (text: string, blogId: number) => {
  const res = await prisma.comment.create({
    data: {
      text,
      blogId,
    },
  });
  return res;
};

export const fetchCommentForBlog = async (blogId: number) => {
  const res = await prisma.comment.findMany({
    where: {
      blogId,
    },
  });
  return res;
};

export const deleteComment = async (id: number) => {
  const res = await prisma.comment.delete({
    where: {
      id,
    },
  });
  return res;
};

export const updateComment = async (id: number, newText: string) => {
  const res = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      text: newText,
    },
  });
  return res;
};
