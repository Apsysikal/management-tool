import { AxiosInstance } from "axios";
import { QueryFunctionContext } from "react-query";
import { transformBackendObject } from "../utils";

// Types
import { Project, ProjectResponse } from "../types/project";

const RESOURCE_KEY = "project";

type QueryParameters = {
  sort?: "title" | "-title";
  skip?: number;
  limit?: number;
  q?: string;
};

export function getProjects() {
  console.debug(`
    Perforimg query for key: ${queryKey}
    Filtering with params: ${params}
  `);

  return axios
    .get<ProjectResponse[]>(RESOURCE_KEY, {
      params: params,
    })
    .then(({ data }) => transformBackendObject(data) as Project[])
    .catch((error) => {
      throw error;
    });
}
