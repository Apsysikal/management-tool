import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "./useAxios";
import { createProject, updateProject, deleteProject } from "../api/project";

import { getAllProjectsQuery } from "queries/project";
import { getProjectDetailsQuery } from "queries/project";

// Types
import { Project } from "../types/project";

export const projectKeys = {
  all: ["projects"] as const,
  detail: (id: string) => [projectKeys.all, "detail", id] as const,
};

export const useProjects = () => {
  const axios = useAxios();

  return useQuery(getAllProjectsQuery(axios.instance));
};

export const useProjectDetails = (id: string) => {
  const axios = useAxios();

  return useQuery(getProjectDetailsQuery(axios.instance, id));
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (project: Omit<Project, "id">) =>
      createProject(project, axios.instance),
    onSuccess: () => queryClient.invalidateQueries(projectKeys.all),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (project: Project) => updateProject(project, axios.instance),
    onSuccess: () => queryClient.invalidateQueries(projectKeys.all),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (project: Project) => deleteProject(project, axios.instance),
    onSuccess: () => queryClient.invalidateQueries(projectKeys.all),
  });
};
