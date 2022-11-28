import React from "react";
import { Add, ChevronRight, Delete, Edit } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  Fab,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlantDialog } from "../components/PlantDialog";
import {
  usePlants,
  useCreatePlant,
  useUpdatePlant,
  useDeletePlant,
} from "../hooks/usePlants";
import { Plant, EmptyPlant } from "../types/plant";

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
        {plants
          ?.filter(({ cabinetId: id }) => id === cabinetId)
          .map((plant) => {
            return (
              <Paper key={plant.id} sx={{ m: 1, p: 1 }}>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <Typography>{plant.shortDescription}</Typography>
                    <Typography sx={{ ml: 1 }}>{plant.description}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => handleEdit(plant)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(plant)}>
                      <Delete />
                    </IconButton>
                    <IconButton component={Link} to={`/plants/${plant.id}`}>
                      <ChevronRight />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
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