import React from "react";
import { Fragment } from "react";
import { FieldArray, Form, Formik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FormTextField } from "../components/forms/TextField";
import { FormSelectField } from "../components/forms/SelectField";
import { Device, EmptyDevice } from "../types/device";

export const emptyDevice: EmptyDevice = {
  plantId: "",
  description: "",
  schemaReference: "",
  manufacturer: "",
  fabricate: "",
  electrical: {
    voltage: 0,
    current: 0,
    power: 0,
  },
  dataPoints: [
    {
      type: "",
      description: "",
      comment: "",
    },
  ],
};

export const DeviceDialog = ({
  open,
  device = emptyDevice,
  handleClose,
  handleSubmit,
}: {
  open: boolean;
  device: Device | EmptyDevice;
  handleClose: () => void;
  handleSubmit: (values: Device | EmptyDevice) => void;
}) => {
  const initialValues = { ...device };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>
        <Typography>Edit Device</Typography>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values }) => (
          <>
            <Form style={{ margin: 0, padding: 0 }}>
              <DialogContent>
                <Grid container>
                  <Grid container columnSpacing={1}>
                    <Grid item xs={12}>
                      <Typography>Device Information</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField name="description" label="Description" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        name="schemaReference"
                        label="Schema Reference"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField name="manufacturer" label="Manufacturer" />
                    </Grid>
                    <Grid item xs={8}>
                      <FormTextField name="fabricate" label="Fabricate" />
                    </Grid>
                  </Grid>
                  <Grid container columnSpacing={1}>
                    <Grid item xs={12}>
                      <Typography mt={2}>Electrical Specifications</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField
                        name="electrical.voltage"
                        label="Voltage"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">V</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField
                        name="electrical.current"
                        label="Current"
                        variant="standard"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">A</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField
                        name="electrical.power"
                        label="Power"
                        variant="standard"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">W</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container columnSpacing={1}>
                    <Grid item xs={12}>
                      <Typography mt={2}>Datapoints</Typography>
                    </Grid>
                    <FieldArray name="dataPoints">
                      {({ push, remove }) => (
                        <>
                          {values.dataPoints.map((dataPoint, index) => {
                            return (
                              <Fragment key={index}>
                                <Grid item xs={3} key={index}>
                                  <FormSelectField
                                    name={`dataPoints.${index}.type`}
                                    label="Type"
                                    options={[
                                      {
                                        value: "Digital Input",
                                        label: "Digital Input",
                                      },
                                      {
                                        value: "Digital Output",
                                        label: "Digital Output",
                                      },
                                      {
                                        value: "Analog Input",
                                        label: "Analog Input",
                                      },
                                      {
                                        value: "Analog Output",
                                        label: "Analog Output",
                                      },
                                    ]}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <FormTextField
                                    name={`dataPoints.${index}.description`}
                                    label="Description"
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <FormTextField
                                    name={`dataPoints.${index}.comment`}
                                    label="Comment"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={1}
                                  display="flex"
                                  alignItems="end"
                                  justifyContent="right"
                                >
                                  <IconButton
                                    size="small"
                                    sx={{ mb: 0.5 }}
                                    onClick={() => remove(index)}
                                  >
                                    <RemoveCircleOutlineIcon fontSize="small" />
                                  </IconButton>
                                </Grid>
                              </Fragment>
                            );
                          })}
                          <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="center"
                          >
                            <IconButton
                              size="small"
                              sx={{ mb: 0.5 }}
                              onClick={() =>
                                push({
                                  type: "",
                                  description: "",
                                  comment: "",
                                })
                              }
                            >
                              <AddCircleOutlineIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                        </>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </Form>
          </>
        )}
      </Formik>
    </Dialog>
  );
};
