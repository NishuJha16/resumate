import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import get from "lodash.get";

const SummaryForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const summary = useWatch({ name: "summary", control }) || "";
  const maxLength = 500;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col">
        <Typography variant="h5" className="!text-lg md:!text-2xl">
          Professional Summary
        </Typography>
        <Typography variant="body1">Enter your professional summary</Typography>
      </div>
      <Controller
        name="summary"
        control={control}
        render={({ field }) => {
          const error: any = get(errors, "summary");
          return (
            <TextField
              {...field}
              label="Write a short professional summary"
              fullWidth
              multiline
              rows={4}
              error={!!error}
              helperText={
                error?.message || `${summary.length}/${maxLength} characters`
              }
              inputProps={{ maxLength }}
            />
          );
        }}
      />
    </section>
  );
};

export default SummaryForm;
