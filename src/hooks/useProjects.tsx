import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../api/project";

// Types
import { Project } from "../types/project";

export const projectKeys = {
  all: ["projects"] as const,
  detail: (id: string) => [projectKeys.all, "detail", id] as const,
};

export const useProjects = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: projectKeys.all,
    queryFn: (context) => getProjects(context, axios.instance),
  });
};

export const useProjectDetails = (id: string) => {
  const axios = useAxios();

  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: (context) => getProjectById(context, axios.instance),
  });
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
