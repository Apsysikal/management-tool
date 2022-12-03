import React from "react";
import { createContext } from "react";
import axios, { AxiosInstance } from "axios";

type IAxiosContext = {
  instance: AxiosInstance;
};

type AxiosProviderProps = {
  axios: AxiosInstance;
  children?: React.ReactNode;
};

export const AxiosContext = createContext<IAxiosContext>({
  instance: axios.create(),
});

export const AxiosProvider = ({ axios, children }: AxiosProviderProps) => {
  return (
    <AxiosContext.Provider value={{ instance: axios }}>
      {children}
    </AxiosContext.Provider>
  );
};
