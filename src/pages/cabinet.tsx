import React from "react";
import { Add } from "@mui/icons-material";
import { AppBar, Container, Fab, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
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
import { Breadcrums } from "components/Breadcrumbs";

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
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">{`Cabinet`}</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Breadcrums />
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
      </Container>
    </>
  );
};
