import prisma from '../db';

const findAll = async () => {
  const articles = await prisma.article.findMany({
  });

  return articles;
};

export { findAll };
