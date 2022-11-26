import { v4 as id } from "uuid";

export const generateId = () => {
  return id();
};

export const transformDataBasedIdField = ({ _id: id = "", ...rest }) => {
  return {
    id,
    ...rest,
  };
};
