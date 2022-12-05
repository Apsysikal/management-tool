import React from "react";
import { useState } from "react";

import { Fab } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";

import { Add } from "@mui/icons-material";

import { useParams } from "react-router-dom";

import { PlantDialog } from "components/PlantDialog";
import {
  usePlants,
  useCreatePlant,
  useUpdatePlant,
  useDeletePlant,
} from "hooks/usePlants";

//Types
import { Plant, EmptyPlant } from "types/plant";
import { PlantAccordion } from "components/PlantAccordion";

export const Cabinet = () => {
  const { cabinetId } = useParams();
  const { data: plants } = usePlants();
  const createPlant = useCreatePlant();
  const updatePlant = useUpdatePlant();
  const deletePlant = useDeletePlant();

  // Dialog
  const [open, setOpen] = useState(false);
  const [plant, setPlant] = useState<Plant | EmptyPlant>({
    cabinetId: cabinetId || "",
    shortDescription: "",
    description: "",
  });

  if (!cabinetId) return null;

  const handleClose = () => {
    setOpen(false);
    setPlant({
      cabinetId: cabinetId || "",
      shortDescription: "",
      description: "",
    });
  };

  const handleSubmit = (values: Plant | EmptyPlant) => {
    if ("id" in values) {
      updatePlant.mutate(values);
    } else {
      createPlant.mutate(values);
    }

    handleClose();
  };

  const handleEdit = (values: Plant) => {
    setPlant(values);
    setOpen(true);
  };

  const handleDelete = (values: Plant) => {
    deletePlant.mutate(values);
  };

  return (
    <>
      <Toolbar disableGutters sx={{ m: 1, p: 1 }}>
        <Typography flexGrow={1}>Plants</Typography>
        <IconButton onClick={() => setOpen(true)}>
          <Add />
        </IconButton>
      </Toolbar>
      {plants
        ?.filter(({ cabinetId: id }) => id === cabinetId)
        .map((plant) => {
          return (
            <PlantAccordion
              key={plant.id}
              plant={plant}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      <PlantDialog
        open={open}
        plant={plant}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>
    </>
  );
};
