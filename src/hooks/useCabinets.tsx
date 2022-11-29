import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import {
  getCabinets,
  getCabinetById,
  createCabinet,
  updateCabient,
  deleteCabinet,
} from "../api/cabinet";

// Types
import { Cabinet } from "../types/cabinet";

export const cabinetKeys = {
  all: ["cabinets"] as const,
  detail: (id: string) => [cabinetKeys.all, "detail", id] as const,
};

export const useCabinets = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: cabinetKeys.all,
    queryFn: (context) => getCabinets(context, axios.instance),
  });
};

export const useCabinetDetails = (id: string) => {
  const axios = useAxios();

  return useQuery({
    queryKey: cabinetKeys.detail(id),
    queryFn: (context) => getCabinetById(context, axios.instance),
  });
};

export const useCreateCabinet = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (cabinet: Omit<Cabinet, "id">) =>
      createCabinet(cabinet, axios.instance),
    onMutate: (variables) => {
      console.debug(variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(cabinetKeys.all);
    },
  });
};

export const useUpdateCabinet = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (cabinet: Cabinet) => updateCabient(cabinet, axios.instance),
    onSuccess: () => queryClient.invalidateQueries(cabinetKeys.all),
  });
};

export const useDeleteCabinet = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (cabinet: Cabinet) => deleteCabinet(cabinet, axios.instance),
    onSuccess: () => {
      queryClient.invalidateQueries(cabinetKeys.all);
    },
  });
};
