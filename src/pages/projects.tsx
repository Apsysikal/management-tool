import React, { useState } from "react";

import { IconButton, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Toolbar } from "@mui/material";

import { Add } from "@mui/icons-material";

import { ProjectDialog } from "../components/ProjectDialog";

import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../hooks/useProjects";

import { Project } from "components/Project";

import { Project as ProjectType, EmptyProject } from "../types/project";

import { QueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { getAllProjectsQuery } from "queries/project";

export const loader = (qc: QueryClient, axios: AxiosInstance) => async () => {
  const query = getAllProjectsQuery(axios);

  return qc.getQueryData(query.queryKey) ?? (await qc.fetchQuery(query));
};

export const Projects = () => {
  const location = useLocation();
  const { data: projects } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  // Dialog
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<ProjectType | EmptyProject>({
    title: "",
  });

  const handleClose = () => {
    setOpen(false);
    setProject({ title: "" });
  };

  const handleSubmit = (values: ProjectType | EmptyProject) => {
    if ("id" in values) {
      updateProject.mutate(values as ProjectType);
    } else {
      createProject.mutate(values as EmptyProject);
    }

    handleClose();
  };

  const handleEdit = (values: ProjectType) => {
    setProject(values);
    setOpen(true);
  };

  const handleDelete = (values: ProjectType) => {
    deleteProject.mutate(values);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={3}>
          <Toolbar disableGutters sx={{ m: 1, p: 1 }}>
            <Typography flexGrow={1}>Projects</Typography>
            <IconButton onClick={() => setOpen(true)}>
              <Add />
            </IconButton>
          </Toolbar>
          {projects?.map((project) => {
            const activeProject = location.pathname.includes(project.id);

            return (
              <Project
                key={project.id}
                project={project}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                sx={{
                  m: 1,
                  p: 1,
                  color: activeProject ? "primary.main" : "",
                }}
              />
            );
          })}
          <ProjectDialog
            open={open}
            project={project}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};
