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
import { CabinetDialog } from "../components/CabinetDialog";
import { useCabinets } from "../hooks/useCabinets";
import { Cabinet, EmptyCabinet } from "../types/cabinet";
import { generateId } from "../utils";

export const Project = () => {
  const { projectId } = useParams();
  const [cabinets, addCabinet, updateCabinet, removeCabinet] =
    useCabinets(projectId);

  // Dialog
  const [open, setOpen] = useState(false);
  const [cabinet, setCabinet] = useState<Cabinet | EmptyCabinet>({
    projectId: projectId || "",
    name: "",
    location: "",
  });

  if (!projectId) return null;

  const handleClose = () => {
    setOpen(false);
    setCabinet({
      projectId: projectId || "",
      name: "",
      location: "",
    });
  };

  const handleSubmit = (values: Cabinet | EmptyCabinet) => {
    if ("id" in values) {
      updateCabinet(values);
    } else {
      addCabinet({ ...values, id: generateId() });
    }

    handleClose();
  };

  const handleEdit = (values: Cabinet) => {
    setCabinet(values);
    setOpen(true);
  };

  const handleDelete = (values: Cabinet) => {
    removeCabinet(values);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Projects</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {cabinets.map((cabinet) => {
          return (
            <Paper key={cabinet.id} sx={{ m: 1, p: 1 }}>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Typography>{cabinet.name}</Typography>
                  <Typography sx={{ ml: 1 }}>{cabinet.location}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleEdit(cabinet)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cabinet)}>
                    <Delete />
                  </IconButton>
                  <IconButton component={Link} to={`/cabinets/${cabinet.id}`}>
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          );
        })}
        <CabinetDialog
          open={open}
          cabinet={cabinet}
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
