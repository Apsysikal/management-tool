import React from "react";

import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material";

import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";

import { Link } from "react-router-dom";

import { Cabinet as CabinetType } from "types/cabinet";

type CabinetProps = {
  cabinet: CabinetType;
  handleEdit: (cabinet: CabinetType) => void;
  handleDelete: (cabinet: CabinetType) => void;
  sx?: SxProps<Theme>;
};

export const Cabinet = ({
  cabinet,
  handleEdit,
  handleDelete,
  sx,
}: CabinetProps) => {
  return (
    <Paper sx={sx}>
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
          <IconButton component={Link} to={`${cabinet.id}`}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
