import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import MessageBox from "./MessageBox";

const CheckboxFields = ({ name, errors, control }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} required />}
            label="Je suis d'accord avec les conditions et la politique de confidentialité de Umiel"
          />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </>
  );
};

export default CheckboxFields;
