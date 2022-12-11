import React from "react";

import { Outlet } from "react-router-dom";

import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";

export const Layout = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Projects</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};
