import { Project } from "../types/project";

const STORAGE_KEY = "projects";

export const getProjects = async () => {
  const localProjectsString = localStorage.getItem(STORAGE_KEY) || "[]";
  const localProjects = await JSON.parse(localProjectsString);
  return localProjects;
};

export const getProject = async (project: Project) => {
  const localProjectsString = localStorage.getItem(STORAGE_KEY) || "[]";
  const localProjects = (await JSON.parse(localProjectsString)) as Project[];

  const matchingProjects = localProjects.filter(({ id }) => id === project.id);

  if (matchingProjects.length >= 1) return matchingProjects[0];

  return undefined;
};
