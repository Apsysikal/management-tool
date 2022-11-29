import { AxiosInstance } from "axios";
import { QueryFunctionContext } from "react-query";
import { transformBackendObject } from "../utils";
import { plantKeys } from "../hooks/usePlants";

// Types
import { Plant, PlantResponse } from "../types/plant";

const RESOURCE_KEY = "plant";

type PlantDetailQueryKey = ReturnType<typeof plantKeys["detail"]>;

export function getPlants(context: QueryFunctionContext, axios: AxiosInstance) {
  const { queryKey } = context;
  const params = {
    sort: "shortDescription",
    skip: 0,
    limit: 1000,
  };

  console.debug(`
    Perforimg query for key: ${queryKey}
    Filtering with params: ${params}
  `);

  return axios
    .get<PlantResponse[]>(RESOURCE_KEY, {
      params,
    })
    .then(({ data }) => transformBackendObject(data) as Plant[])
    .catch((error) => {
      throw error;
    });
}

export function getPlantById(
  context: QueryFunctionContext<PlantDetailQueryKey>,
  axios: AxiosInstance
) {
  const { queryKey } = context;
  const id = queryKey[2];

  return axios
    .get<PlantResponse>(`${RESOURCE_KEY}/${id}`)
    .then(({ data }) => transformBackendObject(data) as Plant)
    .catch((error) => {
      throw error;
    });
}

export function createPlant(plant: Omit<Plant, "id">, axios: AxiosInstance) {
  return axios
    .post<PlantResponse>(RESOURCE_KEY, plant)
    .then(({ data }) => transformBackendObject(data) as Plant)
    .catch((error) => {
      throw error;
    });
}

export function updatePlant(plant: Plant, axios: AxiosInstance) {
  return axios
    .put<PlantResponse>(`${RESOURCE_KEY}/${plant.id}`, plant)
    .then(({ data }) => transformBackendObject(data) as Plant)
    .catch((error) => {
      throw error;
    });
}

export function deletePlant(plant: Plant, axios: AxiosInstance) {
  return axios
    .delete<{ message: string }>(`/record/${plant.id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
}
