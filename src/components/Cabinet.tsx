import React from "react";

import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material";
import { Stack } from "@mui/material";

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
        <Box display="flex" alignItems="center" width={1 / 2}>
          <Stack width={1}>
            <Typography
              width={1}
              noWrap
              overflow="clip"
              textOverflow="ellipsis"
            >
              {cabinet.name}
            </Typography>
            <Typography
              width={1}
              noWrap
              overflow="clip"
              textOverflow="ellipsis"
            >
              {cabinet.location}
            </Typography>
          </Stack>
        </Box>
        <Box display="flex" alignItems="center">
          <Stack direction="row">
            <IconButton onClick={() => handleEdit(cabinet)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(cabinet)}>
              <Delete />
            </IconButton>
            <IconButton component={Link} to={`${cabinet.id}`}>
              <ChevronRight />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};
