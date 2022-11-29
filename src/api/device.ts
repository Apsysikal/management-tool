import { AxiosInstance } from "axios";
import { QueryFunctionContext } from "react-query";
import { transformBackendObject } from "../utils";
import { deviceKeys } from "../hooks/useDevices";

// Types
import { Device, DeviceResponse } from "../types/device";

const RESOURCE_KEY = "device";

type DeviceDetailQueryKey = ReturnType<typeof deviceKeys["detail"]>;

export function getDevices(
  context: QueryFunctionContext,
  axios: AxiosInstance
) {
  const { queryKey } = context;
  const params = {
    sort: "schemaReference",
    skip: 0,
    limit: 1000,
  };

  console.debug(`
    Perforimg query for key: ${queryKey}
    Filtering with params: ${params}
  `);

  return axios
    .get<DeviceResponse[]>(RESOURCE_KEY, {
      params,
    })
    .then(({ data }) => transformBackendObject(data) as Device[])
    .catch((error) => {
      throw error;
    });
}

export function getDeviceById(
  context: QueryFunctionContext<DeviceDetailQueryKey>,
  axios: AxiosInstance
) {
  const { queryKey } = context;
  const id = queryKey[2];

  return axios
    .get<DeviceResponse>(`${RESOURCE_KEY}/${id}`)
    .then(({ data }) => transformBackendObject(data) as Device)
    .catch((error) => {
      throw error;
    });
}

export function createDevice(device: Omit<Device, "id">, axios: AxiosInstance) {
  return axios
    .post<DeviceResponse>(RESOURCE_KEY, device)
    .then(({ data }) => transformBackendObject(data) as Device)
    .catch((error) => {
      throw error;
    });
}

export function updateDevice(device: Device, axios: AxiosInstance) {
  return axios
    .put<DeviceResponse>(`${RESOURCE_KEY}/${device.id}`, device)
    .then(({ data }) => transformBackendObject(data) as Device)
    .catch((error) => {
      throw error;
    });
}

export function deleteDevice(device: Device, axios: AxiosInstance) {
  return axios
    .delete<{ message: string }>(`/record/${device.id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
}
