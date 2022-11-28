export type Project = {
  id: string;
  title: string;
};

export type ProjectResponse = {
  _id: string;
  title: string;
  _createdOn: string;
};

export type EmptyProject = Omit<Project, "id">;
