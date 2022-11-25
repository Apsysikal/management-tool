export type Project = {
  id: string;
  title: string;
};

export type EmptyProject = Omit<Project, "id">;
