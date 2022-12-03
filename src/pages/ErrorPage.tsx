import React from "react";

import { useRouteError } from "react-router-dom";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";

type Error = {
  statusText?: string;
  message?: string;
};

export const ErrorPage = () => {
  const error = useRouteError() as Error;

  console.error(error);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">Error</Typography>
      <Typography variant="body1">An unexpected error has occured.</Typography>
      <Typography variant="body1" color="error">
        {error?.statusText || error?.message}
      </Typography>
    </Box>
  );
};
