import { useContext } from "react";
import { AxiosContext } from "../contexts/axios";

export const useAxios = () => {
  return useContext(AxiosContext);
};
