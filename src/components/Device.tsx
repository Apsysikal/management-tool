import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";

import { Device as DeviceType } from "../types/device";

const NormalDevice = ({
  device,
  handleEdit,
  handleDelete,
}: {
  device: DeviceType;
  handleEdit: (device: DeviceType) => void;
  handleDelete: (device: DeviceType) => void;
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography display="inline-block" fontWeight="600">
            {device.description}
          </Typography>
          {device.schemaReference.length > 0 && (
            <Typography
              display="inline-block"
              sx={{ ml: 1 }}
              fontSize=""
            >{`(${device.schemaReference})`}</Typography>
          )}
          {(device.manufacturer.length > 0 || device.fabricate.length > 0) && (
            <Typography fontSize="small" color="text.secondary">{`${
              device.manufacturer
            }${device.manufacturer.length > 0 ? " - " : ""}${
              device.fabricate
            }`}</Typography>
          )}
        </Box>
        <Box>
          <IconButton onClick={() => handleEdit(device)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handleDelete(device)}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" gap={1} mt={1}>
        {device.electrical.voltage > 0 && (
          <Box display="flex">
            <Typography variant="body1" fontSize="small">
              {"Spannung:"}
            </Typography>
            <Typography
              variant="body1"
              fontSize="small"
              sx={{ ml: 0.5 }}
            >{`${device.electrical.voltage}V`}</Typography>
          </Box>
        )}
        {device.electrical.current > 0 && (
          <Box display="flex">
            <Typography variant="body1" fontSize="small">
              {"Strom:"}
            </Typography>
            <Typography
              variant="body1"
              fontSize="small"
              sx={{ ml: 0.5 }}
            >{`${device.electrical.current}A`}</Typography>
          </Box>
        )}
        {device.electrical.power > 0 && (
          <Box display="flex">
            <Typography variant="body1" fontSize="small">
              {"Leistung:"}
            </Typography>
            <Typography
              variant="body1"
              fontSize="small"
              sx={{ ml: 0.5 }}
            >{`${device.electrical.power}W`}</Typography>
          </Box>
        )}
      </Box>
      {device.dataPoints.length > 0 && (
        <Table padding="none" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body2" fontSize="small" fontWeight="bold">
                  Datenpunktbezeichnung
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontSize="small" fontWeight="bold">
                  Typ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontSize="small" fontWeight="bold">
                  Kommentar
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {device.dataPoints.map((point, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{point.description}</TableCell>
                  <TableCell>{point.type}</TableCell>
                  <TableCell>{point.comment}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

const CompactDevice = ({
  device,
  handleEdit,
  handleDelete,
}: {
  device: DeviceType;
  handleEdit: (device: DeviceType) => void;
  handleDelete: (device: DeviceType) => void;
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "top",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography display="inline-block" fontWeight="600">
            {device.description}
          </Typography>
          {device.schemaReference.length > 0 && (
            <Typography
              display="inline-block"
              sx={{ ml: 1 }}
              fontSize=""
            >{`(${device.schemaReference})`}</Typography>
          )}
          {(device.manufacturer.length > 0 || device.fabricate.length > 0) && (
            <Typography fontSize="small" color="text.secondary">{`${
              device.manufacturer
            }${device.manufacturer.length > 0 ? " - " : ""}${
              device.fabricate
            }`}</Typography>
          )}
        </Box>
        <Box>
          <IconButton onClick={() => handleEdit(device)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handleDelete(device)}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export const Device = ({
  view,
  device,
  handleEdit,
  handleDelete,
}: {
  view: "normal" | "compact";
  device: DeviceType;
  handleEdit: (device: DeviceType) => void;
  handleDelete: (device: DeviceType) => void;
}) => {
  return (
    <>
      <Paper elevation={0} sx={{ pt: 1, mb: 1 }}>
        {view === "normal" && (
          <NormalDevice
            device={device}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
        {view === "compact" && (
          <CompactDevice
            device={device}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </Paper>
    </>
  );
};
