import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import * as ReactDOMClient from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AxiosProvider } from "./contexts/axios";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AxiosProvider>
        <Router>
          <CssBaseline />
          <App />
        </Router>
      </AxiosProvider>
    </QueryClientProvider>
  </StrictMode>
);
