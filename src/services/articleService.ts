import { findAll } from "../repositories/articleRepository";

const getAllArticles = async () => {
  const articles = await findAll();

  return articles;
};

export { getAllArticles };
