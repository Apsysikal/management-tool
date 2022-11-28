import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import { transformBackendObject } from "../utils";
import { getProjects } from "../api/project";

// Types
import { Project, ProjectResponse } from "../types/project";

const projectKeys = {
  all: ["projects"] as const,
  detail: (id: string) => [projectKeys.all, "detail", id] as const,
};

export const useProjects = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: projectKeys.all,
    queryFn: (queryKey) =>
      getProjects({ queryKey: projectKeys.all, axios: axios.instance }),
  });
};

export const useProjectDetails = (id: string) => {
  const axios = useAxios();

  function getProjectById(id: string) {
    return axios.instance
      .get<ProjectResponse>(`/project/${id}`)
      .then(({ data }) => transformBackendObject(data) as Project)
      .catch((error) => {
        throw error;
      });
  }

  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => getProjectById(id),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function createProject(project: Omit<Project, "id">) {
    return axios.instance
      .post<ProjectResponse>("/project", project)
      .then(({ data }) => transformBackendObject(data) as Project)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (project: Omit<Project, "id">) => createProject(project),
    onMutate: (variables) => {
      console.debug(variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(projectKeys.all);
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function modifyProject(project: Project) {
    return axios.instance
      .put<ProjectResponse>(`/${project.id}`, project)
      .then(({ data }) => transformBackendObject(data) as Project)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (project: Project) => modifyProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries(projectKeys.all);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function deleteProject(project: Project) {
    return axios.instance
      .delete<{ message: string }>(`/record/${project.id}`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (project: Project) => deleteProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries(projectKeys.all);
    },
  });
};
