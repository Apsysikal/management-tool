import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import {
  getPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
} from "../api/plant";

// Types
import { Plant } from "../types/plant";

export const plantKeys = {
  all: ["plants"] as const,
  detail: (id: string) => [plantKeys.all, "detail", id] as const,
};

export const usePlants = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: plantKeys.all,
    queryFn: (context) => getPlants(context, axios.instance),
  });
};

export const usePlantDetails = (id: string) => {
  const axios = useAxios();

  return useQuery({
    queryKey: plantKeys.detail(id),
    queryFn: (context) => getPlantById(context, axios.instance),
  });
};

export const useCreatePlant = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (plant: Omit<Plant, "id">) =>
      createPlant(plant, axios.instance),
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

  return useMutation({
    mutationFn: (plant: Plant) => updatePlant(plant, axios.instance),
    onSuccess: () => queryClient.invalidateQueries(plantKeys.all),
  });
};

export const useDeletePlant = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (plant: Plant) => deletePlant(plant, axios.instance),
    onSuccess: () => {
      queryClient.invalidateQueries(plantKeys.all);
    },
  });
};
