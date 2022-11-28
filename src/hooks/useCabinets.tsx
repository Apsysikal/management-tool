import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import { Cabinet, CabinetResponse } from "../types/cabinet";
import { transformBackendObject } from "../utils";

const cabinetKeys = {
  all: ["cabinets"] as const,
  detail: (id: string) => [cabinetKeys.all, "detail", id] as const,
};

export const useCabinets = () => {
  const axios = useAxios();

  function getCabinets() {
    return axios.instance
      .get<CabinetResponse[]>("/cabinet")
      .then(({ data }) => transformBackendObject(data) as Cabinet[])
      .catch((error) => {
        throw error;
      });
  }

  return useQuery({
    queryKey: cabinetKeys.all,
    queryFn: getCabinets,
  });
};

export const useCabinetDetails = (id: string) => {
  const axios = useAxios();

  function getCabinetById(id: string) {
    return axios.instance
      .get<CabinetResponse>(`/cabinet/${id}`)
      .then(({ data }) => transformBackendObject(data) as Cabinet)
      .catch((error) => {
        throw error;
      });
  }

  return useQuery({
    queryKey: cabinetKeys.detail(id),
    queryFn: () => getCabinetById(id),
  });
};

export const useCreateCabinet = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function createCabinet(cabinet: Omit<Cabinet, "id">) {
    return axios.instance
      .post<CabinetResponse>("/cabinet", cabinet)
      .then(({ data }) => transformBackendObject(data) as Cabinet)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (cabinet: Omit<Cabinet, "id">) => createCabinet(cabinet),
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

  function updateCabient(cabinet: Cabinet) {
    return axios.instance
      .put<CabinetResponse>(`/cabinet/${cabinet.id}`, cabinet)
      .then(({ data }) => transformBackendObject(data) as Cabinet)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (cabinet: Cabinet) => updateCabient(cabinet),
    onSuccess: () => queryClient.invalidateQueries(cabinetKeys.all),
  });
};

export const useDeleteCabinet = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function deleteCabinet(cabinet: Cabinet) {
    return axios.instance
      .delete<{ message: string }>(`/record/${cabinet.id}`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (cabinet: Cabinet) => deleteCabinet(cabinet),
    onSuccess: () => {
      queryClient.invalidateQueries(cabinetKeys.all);
    },
  });
};
