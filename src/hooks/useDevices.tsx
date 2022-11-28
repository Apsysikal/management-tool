import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import { Device, DeviceResponse } from "../types/device";
import { transformBackendObject } from "../utils";

const deviceKeys = {
  all: ["devices"] as const,
  detail: (id: string) => [deviceKeys.all, "detail", id] as const,
};

export const useDevices = () => {
  const axios = useAxios();

  function getDevices() {
    return axios.instance
      .get<DeviceResponse[]>("/device")
      .then(({ data }) => transformBackendObject(data) as Device[])
      .catch((error) => {
        throw error;
      });
  }

  return useQuery({
    queryKey: deviceKeys.all,
    queryFn: getDevices,
  });
};

export const useDeviceDetails = (id: string) => {
  const axios = useAxios();

  function getDeviceById(id: string) {
    return axios.instance
      .get<DeviceResponse>(`/device/${id}`)
      .then(({ data }) => transformBackendObject(data) as Device)
      .catch((error) => {
        throw error;
      });
  }

  return useQuery({
    queryKey: deviceKeys.detail(id),
    queryFn: () => getDeviceById(id),
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function createDevice(device: Omit<Device, "id">) {
    return axios.instance
      .post<DeviceResponse>("/device", device)
      .then(({ data }) => transformBackendObject(data) as Device)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (device: Omit<Device, "id">) => createDevice(device),
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

  function updateDevice(device: Device) {
    return axios.instance
      .put<DeviceResponse>(`/device/${device.id}`, device)
      .then(({ data }) => transformBackendObject(data) as Device)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (device: Device) => updateDevice(device),
    onSuccess: () => queryClient.invalidateQueries(deviceKeys.all),
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  function deleteDevice(device: Device) {
    return axios.instance
      .delete<{ message: string }>(`/record/${device.id}`)
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
  }

  return useMutation({
    mutationFn: (device: Device) => deleteDevice(device),
    onSuccess: () => {
      queryClient.invalidateQueries(deviceKeys.all);
    },
  });
};
