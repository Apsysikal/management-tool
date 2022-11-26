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
import { useDevices } from "../hooks/useDevices";
import { Device as DeviceType, EmptyDevice } from "../types/device";
import { Device } from "../components/Device";
import { generateId } from "../utils";

export function Plant() {
  const { plantId } = useParams();
  const [devices, addDevice, updateDevice, removeDevice] = useDevices(plantId);
  const [expandedView] = useState(true);
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
      updateDevice(device);
    } else {
      addDevice({ ...device, id: generateId() });
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
    removeDevice(device);
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
        {devices.map((device) => {
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
