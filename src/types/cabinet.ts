export type Cabinet = {
  id: string;
  projectId: string;
  name: string;
  location: string;
};

export type CabinetResponse = {
  _id: string;
  projectId: string;
  name: string;
  location: string;
};

export type EmptyCabinet = Omit<Cabinet, "id">;
