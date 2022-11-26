import React, { useState } from "react";
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
import { Add, Edit, Delete, ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ProjectDialog } from "../components/ProjectDialog";
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../hooks/useProjects";
import { Project, EmptyProject } from "../types/project";

export const Projects = () => {
  const { data: projects } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  // Dialog
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<Project | EmptyProject>({ title: "" });

  const handleClose = () => {
    setOpen(false);
    setProject({ title: "" });
  };

  const handleSubmit = (values: Project | EmptyProject) => {
    if (values.hasOwnProperty("id")) {
      updateProject.mutate(values as Project);
    } else {
      createProject.mutate(values as EmptyProject);
    }

    handleClose();
  };

  const handleEdit = (values: Project) => {
    setProject(values);
    setOpen(true);
  };

  const handleDelete = (values: Project) => {
    deleteProject.mutate(values);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Projects</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {projects?.map((project) => {
          return (
            <Paper key={project.id} sx={{ m: 1, p: 1 }}>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Typography>{project.title}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleEdit(project)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(project)}>
                    <Delete />
                  </IconButton>
                  <IconButton component={Link} to={`/projects/${project.id}`}>
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          );
        })}
        <ProjectDialog
          open={open}
          project={project}
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
