import { v4 as id } from "uuid";

export const generateId = () => {
  return id();
};

export type BackendObject = { _id: string } & Record<string, unknown>;
export type FrontendObject = { id: string } & Record<string, unknown>;

export function transformBackendObject(data: BackendObject): FrontendObject;
export function transformBackendObject(data: BackendObject[]): FrontendObject[];
export function transformBackendObject(data: BackendObject | BackendObject[]) {
  if (Array.isArray(data)) {
    const transformedData = data.map(({ _id, ...rest }) => {
      return {
        id: _id,
        ...rest,
      };
    });

    return transformedData;
  }

  const { _id: id, ...rest } = data;
  return {
    id,
    ...rest,
  };
}
