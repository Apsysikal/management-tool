import React from "react";
import { Add } from "@mui/icons-material";
import {
  AppBar,
  Container,
  CssBaseline,
  Fab,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DeviceDialog, emptyDevice } from "../components/DeviceDialog";
import {
  useCreateDevice,
  useDeleteDevice,
  useDevices,
  useUpdateDevice,
} from "../hooks/useDevices";
import { Device as DeviceType, EmptyDevice } from "../types/device";
import { Device } from "../components/Device";

export function Plant() {
  const { plantId } = useParams();
  const { data: devices } = useDevices();
  const createDevice = useCreateDevice();
  const updateDevice = useUpdateDevice();
  const deleteDevice = useDeleteDevice();
  const [expandedView] = useState(true);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [dialogDevice, setDialogDevice] = useState<DeviceType | EmptyDevice>({
    ...emptyDevice,
    plantId: plantId || "",
  });

  const handleDeviceDialogClose = () => {
    setDialogDevice({ ...emptyDevice, plantId: plantId || "" });
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
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">{`Plant`}</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {devices
          ?.filter(({ plantId: id }) => id === plantId)
          .map((device) => {
            return (
              <Device
                key={device.id}
                view={expandedView ? "normal" : "compact"}
                device={device}
                handleEdit={handleDeviceEdit}
                handleDelete={handleDeviceDelete}
              />
            );
          })}
      </Container>
      <DeviceDialog
        open={open}
        device={dialogDevice}
        handleClose={handleDeviceDialogClose}
        handleSubmit={handleDeviceDialogSubmit}
      />
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>
    </>
  );
}
