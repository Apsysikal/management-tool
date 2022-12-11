import React from "react";

import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createAxiosInstance } from "lib/axios";
import { AxiosProvider } from "contexts/axios";

import { CssBaseline } from "@mui/material";

import { Layout } from "./pages/Layout";
import { Projects, loader as projectsLoader } from "./pages/projects";
import { Project } from "./pages/project";
import { Cabinet } from "./pages/cabinet";
import { ErrorPage } from "pages/ErrorPage";

const queryClient = new QueryClient();
const axios = createAxiosInstance();

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Projects />,
        loader: projectsLoader(queryClient, axios),
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":projectId",
            element: <Project />,
            children: [
              {
                path: ":cabinetId",
                element: <Cabinet />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AxiosProvider axios={axios}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ReactQueryDevtools position="bottom-left" />
        </AxiosProvider>
      </QueryClientProvider>
    </>
  );
}
