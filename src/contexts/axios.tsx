import React, { createContext } from "react";
import axios, { AxiosInstance } from "axios";

const KRATE_ID = "5296b1fd8bf1a0a9e60f";
const API_KEY = "d3f80f81-6910-4d0d-933c-a53eb7c53fc5";
const BASE_URL = `https://krat.es/${KRATE_ID}`;

export type IAxiosContext = {
  instance: AxiosInstance;
};

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    "x-api-key": API_KEY
  }
});

export const AxiosContext = createContext<IAxiosContext>({
  instance
});

export const AxiosProvider: React.FC = ({ children }) => {
  return (
    <AxiosContext.Provider value={{ instance }}>
      {children}
    </AxiosContext.Provider>
  );
};
