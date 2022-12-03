import { AxiosInstance } from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import { transformBackendObject } from "../utils";
import { cabinetKeys } from "../hooks/useCabinets";

// Types
import { Cabinet, CabinetResponse } from "../types/cabinet";

const RESOURCE_KEY = "cabinet";

type CabinetDetailQueryKey = ReturnType<typeof cabinetKeys["detail"]>;

export function getCabinets(
  context: QueryFunctionContext,
  axios: AxiosInstance
) {
  const { queryKey } = context;
  const params = {
    sort: "name",
    skip: 0,
    limit: 1000,
  };

  console.debug(`
    Perforimg query for key: ${queryKey}
    Filtering with params: ${params}
  `);

  return axios
    .get<CabinetResponse[]>(RESOURCE_KEY, {
      params,
    })
    .then(({ data }) => transformBackendObject(data) as Cabinet[])
    .catch((error) => {
      throw error;
    });
}

export function getCabinetById(
  context: QueryFunctionContext<CabinetDetailQueryKey>,
  axios: AxiosInstance
) {
  const { queryKey } = context;
  const id = queryKey[2];

  return axios
    .get<CabinetResponse>(`${RESOURCE_KEY}/${id}`)
    .then(({ data }) => transformBackendObject(data) as Cabinet)
    .catch((error) => {
      throw error;
    });
}

export function createCabinet(
  cabinet: Omit<Cabinet, "id">,
  axios: AxiosInstance
) {
  return axios
    .post<CabinetResponse>(RESOURCE_KEY, cabinet)
    .then(({ data }) => transformBackendObject(data) as Cabinet)
    .catch((error) => {
      throw error;
    });
}

export function updateCabient(cabinet: Cabinet, axios: AxiosInstance) {
  return axios
    .put<CabinetResponse>(`${RESOURCE_KEY}/${cabinet.id}`, cabinet)
    .then(({ data }) => transformBackendObject(data) as Cabinet)
    .catch((error) => {
      throw error;
    });
}

export function deleteCabinet(cabinet: Cabinet, axios: AxiosInstance) {
  return axios
    .delete<{ message: string }>(`/record/${cabinet.id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
}
