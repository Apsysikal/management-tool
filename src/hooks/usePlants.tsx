import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import { Plant, PlantResponse } from "../types/plant";
import { transformBackendObject } from "../utils";

const plantKeys = {
  all: ["plants"] as const,
  detail: (id: string) => [plantKeys.all, "detail", id] as const,
};

export const usePlants = () => {
  const axios = useAxios();

  function getPlants() {
    return axios.instance
      .get<PlantResponse[]>("/plant")
      .then(({ data }) => transformBackendObject(data) as Plant[])
      .catch((error) => {
        throw error;
      });
  }

  return useQuery({
    queryKey: plantKeys.all,
    queryFn: getPlants,
  });
};

export const usePlantDetails = (id: string) => {
  const axios = useAxios();

  function getPlantById(id: string) {
    return axios.instance
      .get<PlantResponse>(`/plant/${id}`)
      .then(({ data }) => transformBackendObject(data) as Plant)
      .catch((error) => {
        throw error;
      });
  }

  return useQuery({
    queryKey: plantKeys.detail(id),
    queryFn: () => getPlantById(id),
  });
};

export const useCreatePlant = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function createPlant(plant: Omit<Plant, "id">) {
    return axios.instance
      .post<PlantResponse>("/plant", plant)
      .then(({ data }) => transformBackendObject(data) as Plant)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (plant: Omit<Plant, "id">) => createPlant(plant),
    onMutate: (variables) => {
      console.debug(variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(plantKeys.all);
    },
  });
};

export const useUpdatePlant = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function updatePlant(plant: Plant) {
    return axios.instance
      .put<PlantResponse>(`/plant/${plant.id}`, plant)
      .then(({ data }) => transformBackendObject(data) as Plant)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (plant: Plant) => updatePlant(plant),
    onSuccess: () => queryClient.invalidateQueries(plantKeys.all),
  });
};

export const useDeletePlant = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function deletePlant(plant: Plant) {
    return axios.instance
      .delete<{ message: string }>(`/record/${plant.id}`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (plant: Plant) => deletePlant(plant),
    onSuccess: () => {
      queryClient.invalidateQueries(plantKeys.all);
    },
  });
};
