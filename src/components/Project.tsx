import React from "react";

import { Link } from "react-router-dom";

import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material";

import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";

import { Project as ProjectType } from "types/project";

type ProjectProps = {
  project: ProjectType;
  handleEdit: (project: ProjectType) => void;
  handleDelete: (project: ProjectType) => void;
  sx?: SxProps<Theme>;
};

export const Project = ({
  project,
  handleEdit,
  handleDelete,
  sx,
}: ProjectProps) => {
  return (
    <Paper sx={sx}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" width={1 / 2}>
          <Typography width={1} overflow="clip" textOverflow="ellipsis">
            {project.title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => handleEdit(project)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(project)}>
            <Delete />
          </IconButton>
          <IconButton component={Link} to={`${project.id}`}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
