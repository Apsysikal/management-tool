import React, { useState } from "react";

import { Paper } from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Collapse } from "@mui/material";
import { Button } from "@mui/material";

import { Delete, Edit, ExpandMore, ExpandLess } from "@mui/icons-material";

import { useDevices } from "hooks/useDevices";
import { useCreateDevice } from "hooks/useDevices";
import { useUpdateDevice } from "hooks/useDevices";
import { useDeleteDevice } from "hooks/useDevices";

import { Device } from "components/Device";
import { DeviceDialog, emptyDevice } from "components/DeviceDialog";

import { Plant as PlantType } from "types/plant";
import { Device as DeviceType, EmptyDevice } from "types/device";

type PlantProps = {
  plant: PlantType;
  deviceView: "normal" | "compact";
  handleEdit: (plant: PlantType) => void;
  handleDelete: (plant: PlantType) => void;
};

export const Plant = ({
  plant,
  deviceView,
  handleEdit,
  handleDelete,
}: PlantProps) => {
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
      <Paper sx={{ m: 1, p: 1 }}>
        <Stack direction="row">
          <Box display="flex" flexGrow={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>{plant.shortDescription}</Typography>
              <Typography>{plant.description}</Typography>
            </Stack>
          </Box>
          <Box>
            <Stack direction="row">
              <IconButton onClick={() => handleEdit(plant)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(plant)}>
                <Delete />
              </IconButton>
              <IconButton onClick={() => toggleExpand()}>
                {expand ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Stack>
          </Box>
        </Stack>
        <Collapse in={expand} sx={{ mt: expand ? 1 : 0 }}>
          {devices
            ?.filter(({ plantId }) => plantId === plant.id)
            .map((device) => {
              return (
                <Device
                  key={device.id}
                  view={deviceView}
                  device={device}
                  handleEdit={handleDeviceEdit}
                  handleDelete={handleDeviceDelete}
                />
              );
            })}
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={() => setOpen(true)}>Add Device</Button>
          </Box>
        </Collapse>
      </Paper>
      <DeviceDialog
        open={open}
        device={dialogDevice}
        handleClose={handleDeviceDialogClose}
        handleSubmit={handleDeviceDialogSubmit}
      />
    </>
  );
};
