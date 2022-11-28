export type Plant = {
  id: string;
  cabinetId: string;
  shortDescription: string;
  description: string;
};

export type PlantResponse = {
  _id: string;
  cabinetId: string;
  shortDescription: string;
  description: string;
};

export type EmptyPlant = Omit<Plant, "id">;
