import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { Add } from "@mui/icons-material";

import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { CabinetDialog } from "../components/CabinetDialog";
import {
  useCabinets,
  useCreateCabinet,
  useUpdateCabinet,
  useDeleteCabinet,
} from "../hooks/useCabinets";
import { Cabinet as CabinetType, EmptyCabinet } from "../types/cabinet";

import { Cabinet } from "components/Cabinet";

export const Project = () => {
  const location = useLocation();
  const { projectId } = useParams();
  const { data: cabinets } = useCabinets();
  const createCabinet = useCreateCabinet();
  const updateCabinet = useUpdateCabinet();
  const deleteCabinet = useDeleteCabinet();

  // Dialog
  const [open, setOpen] = useState(false);
  const [cabinet, setCabinet] = useState<CabinetType | EmptyCabinet>({
    projectId: projectId || "",
    name: "",
    location: "",
  });

  useEffect(() => {
    setCabinet({
      projectId: projectId || "",
      name: "",
      location: "",
    });
  }, [projectId]);

  if (!projectId) return null;

  const handleClose = () => {
    setOpen(false);
    setCabinet({
      projectId: projectId || "",
      name: "",
      location: "",
    });
  };

  const handleSubmit = (values: CabinetType | EmptyCabinet) => {
    if ("id" in values) {
      updateCabinet.mutate(values);
    } else {
      createCabinet.mutate(values);
    }

    handleClose();
  };

  const handleEdit = (values: CabinetType) => {
    setCabinet(values);
    setOpen(true);
  };

  const handleDelete = (values: CabinetType) => {
    deleteCabinet.mutate(values);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Toolbar disableGutters sx={{ m: 1, p: 1 }}>
          <Typography flexGrow={1}>Cabinets</Typography>
          <IconButton onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Toolbar>
        {cabinets
          ?.filter(({ projectId: id }) => id === projectId)
          .map((cabinet) => {
            const activeCabinet = location.pathname.includes(cabinet.id);

            return (
              <Cabinet
                key={cabinet.id}
                cabinet={cabinet}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                sx={{ m: 1, p: 1, color: activeCabinet ? "primary.main" : "" }}
              />
            );
          })}
        <CabinetDialog
          open={open}
          cabinet={cabinet}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
