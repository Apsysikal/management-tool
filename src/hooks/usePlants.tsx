import { useItems } from "./useItems";
import { Plant } from "../types/plant";

export function usePlants(cabinetId?: string) {
  const [plants, ...modifiers] = useItems<Plant>("plant", []);

  const filter = (plant: Plant) => plant.cabinetId === cabinetId;
  const filteredPlants = plants.filter(filter);

  return [filteredPlants, ...modifiers] as const;
}
