import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from "@mui/material";
import { Formik, Form } from "formik";
import { FormTextField } from "../components/forms/TextField";
import { EmptyCabinet } from "../types/cabinet";

export const CabinetDialog = ({
  open,
  cabinet = { projectId: "", name: "", location: "" },
  handleClose,
  handleSubmit
}: {
  open: boolean;
  cabinet?: EmptyCabinet;
  handleClose: Function;
  handleSubmit: Function;
}) => {
  const initialValues = { ...cabinet };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Edit Cabinet</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, handleChange }) => (
          <>
            <Form style={{ margin: 0, padding: 0 }}>
              <DialogContent>
                <Grid container>
                  <Grid container columnSpacing={1}>
                    <Grid item xs={12}>
                      <Typography>Cabinet Information</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        name="name"
                        label="Name"
                        placeholder="Cabinet Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        name="location"
                        label="Location"
                        placeholder="Cabinet Location"
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
