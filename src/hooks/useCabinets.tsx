import { useItems } from "./useItems";
import { Cabinet } from "../types/cabinet";

export function useCabinets(projectId?: string) {
  const [cabinets, ...modifiers] = useItems<Cabinet>("cabinet", []);

  const filter = (cabinet: Cabinet) => cabinet.projectId === projectId;
  const filteredCabinets = cabinets.filter(filter);

  return [filteredCabinets, ...modifiers] as const;
}
