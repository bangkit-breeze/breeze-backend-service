import { findAll, findById } from '../repositories/projectRepository';

const findAllProject = async () => {
  const projects = await findAll();

  return projects;
}

const findProjectById = async (id: number) => {
  const project = await findById(id);

  return project;
}
  

export { findAllProject, findProjectById };
