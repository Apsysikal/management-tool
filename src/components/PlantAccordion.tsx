import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  AccordionActions,
  Button,
} from "@mui/material";
import { Delete, Edit, ExpandMore, ExpandLess } from "@mui/icons-material";

import { useDevices } from "hooks/useDevices";
import { useCreateDevice } from "hooks/useDevices";
import { useUpdateDevice } from "hooks/useDevices";
import { useDeleteDevice } from "hooks/useDevices";

import { Device } from "components/Device";
import { DeviceDialog, emptyDevice } from "components/DeviceDialog";

import { Plant as PlantType } from "types/plant";
import { Device as DeviceType, EmptyDevice } from "types/device";

type PlantAccordionProps = {
  plant: PlantType;
  handleEdit: (plant: PlantType) => void;
  handleDelete: (plant: PlantType) => void;
};

export const PlantAccordion = ({
  plant,
  handleEdit,
  handleDelete,
}: PlantAccordionProps) => {
  const { data: devices } = useDevices();
  const createDevice = useCreateDevice();
  const updateDevice = useUpdateDevice();
  const deleteDevice = useDeleteDevice();

  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((previous) => !previous);
  };

  const resetDialogDevice = (): DeviceType | EmptyDevice => {
    return {
      ...emptyDevice,
      plantId: plant.id,
    };
  };

  // Device Dialog state
  const [open, setOpen] = useState(false);
  const [dialogDevice, setDialogDevice] = useState<DeviceType | EmptyDevice>(
    resetDialogDevice()
  );

  const handleDeviceDialogClose = () => {
    setDialogDevice(resetDialogDevice());
    setOpen(() => false);
  };

  const handleDeviceDialogSubmit = (device: DeviceType | EmptyDevice) => {
    console.debug(device);

    if ("id" in device) {
      updateDevice.mutate(device);
    } else {
      createDevice.mutate(device);
    }

    handleDeviceDialogClose();
  };

  const handleDeviceEdit = (device: DeviceType) => {
    setDialogDevice(() => {
      return {
        ...device,
      };
    });
    setOpen(() => true);
  };

  const handleDeviceDelete = (device: DeviceType) => {
    deleteDevice.mutate(device);
  };

  return (
    <>
      <Accordion expanded={expand}>
        <AccordionSummary sx={{ pointerEvents: "none" }}>
          <Box display="flex" flexGrow={1} alignItems="center">
            <Typography>{`${plant.shortDescription} ${plant.description}`}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{ pointerEvents: "auto" }}
          >
            <IconButton onClick={() => handleEdit(plant)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(plant)}>
              <Delete />
            </IconButton>
            <IconButton onClick={toggleExpand}>
              {expand ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {devices
            ?.filter(({ plantId }) => plantId === plant.id)
            .map((device) => {
              return (
                <Device
                  key={device.id}
                  view="normal"
                  device={device}
                  handleEdit={handleDeviceEdit}
                  handleDelete={handleDeviceDelete}
                />
              );
            })}
        </AccordionDetails>
        <AccordionActions>
          <Button onClick={() => setOpen(true)}>Add Device</Button>
        </AccordionActions>
      </Accordion>
      <DeviceDialog
        open={open}
        device={dialogDevice}
        handleClose={handleDeviceDialogClose}
        handleSubmit={handleDeviceDialogSubmit}
      />
    </>
  );
};
