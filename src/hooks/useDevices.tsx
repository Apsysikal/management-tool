import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../api/device";

// Types
import { Device } from "../types/device";

export const deviceKeys = {
  all: ["devices"] as const,
  detail: (id: string) => [deviceKeys.all, "detail", id] as const,
};

export const useDevices = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: deviceKeys.all,
    queryFn: (context) => getDevices(context, axios.instance),
  });
};

export const useDeviceDetails = (id: string) => {
  const axios = useAxios();

  return useQuery({
    queryKey: deviceKeys.detail(id),
    queryFn: (context) => getDeviceById(context, axios.instance),
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (device: Omit<Device, "id">) =>
      createDevice(device, axios.instance),
    onMutate: (variables) => {
      console.debug(variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(deviceKeys.all);
    },
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (device: Device) => updateDevice(device, axios.instance),
    onSuccess: () => queryClient.invalidateQueries(deviceKeys.all),
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation({
    mutationFn: (device: Device) => deleteDevice(device, axios.instance),
    onSuccess: () => {
      queryClient.invalidateQueries(deviceKeys.all);
    },
  });
};
