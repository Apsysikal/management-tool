import { AxiosInstance } from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { transformBackendObject } from "../utils";
import { projectKeys } from "../hooks/useProjects";

// Types
import { Project, ProjectResponse } from "../types/project";

const RESOURCE_KEY = "project";

type ProjectDetailQueryKey = ReturnType<typeof projectKeys["detail"]>;

export function getProjects(
  context: QueryFunctionContext,
  axios: AxiosInstance
) {
  const { queryKey } = context;
  const params = {
    sort: "title",
    skip: 0,
    limit: 1000,
  };

  console.debug(`
    Perforimg query for key: ${queryKey}
    Filtering with params: ${params}
  `);

  return axios
    .get<ProjectResponse[]>(RESOURCE_KEY, {
      params,
    })
    .then(({ data }) => transformBackendObject(data) as Project[])
    .catch((error) => {
      throw error;
    });
}

export function getProjectById(
  context: QueryFunctionContext<ProjectDetailQueryKey>,
  axios: AxiosInstance
) {
  const { queryKey } = context;
  const id = queryKey[2];

  return axios
    .get<ProjectResponse>(`${RESOURCE_KEY}/${id}`)
    .then(({ data }) => transformBackendObject(data) as Project)
    .catch((error) => {
      throw error;
    });
}

export function createProject(
  project: Omit<Project, "id">,
  axios: AxiosInstance
) {
  return axios
    .post<ProjectResponse>(RESOURCE_KEY, project)
    .then(({ data }) => transformBackendObject(data) as Project)
    .catch((error) => {
      throw error;
    });
}

export function updateProject(project: Project, axios: AxiosInstance) {
  return axios
    .put<ProjectResponse>(`/${project.id}`, project)
    .then(({ data }) => transformBackendObject(data) as Project)
    .catch((error) => {
      throw error;
    });
}

export function deleteProject(project: Project, axios: AxiosInstance) {
  return axios
    .delete<{ message: string }>(`/record/${project.id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
}
