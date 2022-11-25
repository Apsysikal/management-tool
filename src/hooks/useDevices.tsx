import { useItems } from "./useItems";
import { Device } from "../types/device";

export function useDevices(plantId?: string) {
  const [devices, ...modifiers] = useItems<Device>("device", []);

  const filter = (device: Device) => device.plantId === plantId;
  const filteredDevices = devices.filter(filter);

  return [filteredDevices, ...modifiers] as const;
}
