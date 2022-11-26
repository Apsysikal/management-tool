import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import { FormTextField } from "../components/forms/TextField";
import { EmptyPlant, Plant } from "../types/plant";

export const PlantDialog = ({
  open,
  plant = { cabinetId: "", shortDescription: "", description: "" },
  handleClose,
  handleSubmit,
}: {
  open: boolean;
  plant?: EmptyPlant;
  handleClose: () => void;
  handleSubmit: (values: Plant | EmptyPlant) => void;
}) => {
  const initialValues = { ...plant };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Edit Plant</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {() => (
          <>
            <Form style={{ margin: 0, padding: 0 }}>
              <DialogContent>
                <Grid container>
                  <Grid container columnSpacing={1}>
                    <Grid item xs={12}>
                      <Typography>Plant Information</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField
                        name="shortDescription"
                        label="Short Description"
                        placeholder="L001"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <FormTextField
                        name="description"
                        label="Description"
                        placeholder="Plant Description"
                      />
                    </Grid>
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
