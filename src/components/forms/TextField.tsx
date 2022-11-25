import { useField } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

type FormTextFieldProps = { name: string } & TextFieldProps;

export const FormTextField = ({ name, ...props }: FormTextFieldProps) => {
  const [field, meta] = useField(name);
  const validationError = Boolean(meta.touched && meta.error);

  return (
    <TextField
      fullWidth
      margin="dense"
      variant="standard"
      error={validationError}
      helperText={validationError ? meta.error : props.helperText}
      {...field}
      {...props}
    />
  );
};
