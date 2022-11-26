import React from "react";
import { useField } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
} from "@mui/material";

type FormSelectFieldProps = {
  name: string;
  options: Array<{ value: string; label: string }>;
} & SelectProps;

export const FormSelectField = ({
  name,
  options,
  ...props
}: FormSelectFieldProps) => {
  const [field, meta] = useField(name);
  const labelId = `${name}.label`;
  const validationError = Boolean(meta.touched && meta.error);

  return (
    <FormControl fullWidth variant="standard" margin="dense">
      <InputLabel id={labelId}>Type</InputLabel>
      <Select labelId={labelId} error={validationError} {...field} {...props}>
        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
