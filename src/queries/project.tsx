import { AxiosInstance } from "axios";

import { QueryFunctionContext } from "@tanstack/react-query";

import { getProjects } from "api/project";
import { getProjectById } from "api/project";

export const queryKeys = {
  all: ["projects"] as const,
  detail: (id: string) => [queryKeys.all, "detail", id] as const,
};

type ProjectDetailQueryKey = ReturnType<typeof queryKeys["detail"]>;

export const getAllProjectsQuery = (axios: AxiosInstance) => ({
  queryKey: queryKeys.all,
  queryFn: (context: QueryFunctionContext) => getProjects(context, axios),
});

export const getProjectDetailsQuery = (axios: AxiosInstance, id: string) => ({
  queryKey: queryKeys.detail(id),
  queryFn: (context: QueryFunctionContext<ProjectDetailQueryKey>) =>
    getProjectById(context, axios),
});
