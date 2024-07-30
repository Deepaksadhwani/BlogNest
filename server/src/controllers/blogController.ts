import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertBlog = async (
  title: string,
  author: string,
  content: string
) => {
  const res = await prisma.blog.create({
    data: {
      title,
      author,
      content,
    },
  });
};

export const fetchBlog = async () => {
  const res = await prisma.blog.findMany();
  console.log(res);
  return res;
};

export const deleteBlog = async (id: number) => {
  const res = await prisma.blog.delete({
    where: {
      id,
    },
  });
  console.log(res);
  return res;
};

