import { v4 as id } from "uuid";

export const generateId = () => {
  return id();
};

export const sortArrayOfObjectsAscending = (key: string) => {
  return (objectA: object, objectB: object) => {
    if (!objectA.hasOwnProperty(key)) return; // Object does not have key to sort by
    if (!objectB.hasOwnProperty(key)) return; // Object does not have key to sort by

    const valueObjectA = String(objectA[key] as string);
  };
};
