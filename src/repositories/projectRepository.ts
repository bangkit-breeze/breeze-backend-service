import prisma from "../db";

const findAll = async () => {
  const projects = await prisma.project.findMany({});

  return projects;
};

const findById = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });

  return project;
}

export { findAll, findById };
