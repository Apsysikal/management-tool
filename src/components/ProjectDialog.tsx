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
import { EmptyProject } from "../types/project";
import { FormTextField } from "../components/forms/TextField";

export const ProjectDialog = ({
  open,
  project = { title: "" },
  handleClose,
  handleSubmit
}: {
  open: boolean;
  project?: EmptyProject;
  handleClose: Function;
  handleSubmit: Function;
}) => {
  const initialValues = { ...project };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Edit Project</DialogTitle>
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
                      <Typography>Project Information</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField name="title" label="Title" />
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
