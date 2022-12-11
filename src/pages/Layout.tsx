import React from "react";
import { useState } from "react";

import { Outlet } from "react-router-dom";

import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { IconButton } from "@mui/material";
import { Drawer } from "@mui/material";

import { Menu } from "@mui/icons-material";

export const Layout = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((previous) => !previous);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => toggleDrawer()}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Management Tool</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => toggleDrawer()}>
        {/** Toolbar is needed for spacing */}
        <Toolbar />
      </Drawer>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};
