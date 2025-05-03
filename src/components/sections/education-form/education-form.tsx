import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import get from "lodash.get";
import { Add, Delete } from "@mui/icons-material";

const EducationForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const handleAdd = () => {
    append({ institution: "", degree: "", startDate: "", endDate: "" });
  };

  return (
    <section className="flex flex-col gap-8">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <div className="flex flex-col">
          <Typography variant="h5" className="!text-lg md:!text-2xl">
            Education
          </Typography>
          <Typography variant="body1">Enter your Education details</Typography>
        </div>
        <Button
          variant="outlined"
          size="small"
          className="!text-xs !capitalize"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Add Education
        </Button>
      </Box>

      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            p: 2,
            mb: 2,
            position: "relative",
            borderRadius: 2,
            border: "1px solid #ccc",
          }}
        >
          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => remove(index)} color="error">
                <Delete />
              </IconButton>
            </Box>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name={`education.${index}.degree`}
                control={control}
                render={({ field }) => {
                  const error = get(errors, `education.${index}.degree`) as any;
                  return (
                    <TextField
                      {...field}
                      label="Degree"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name={`education.${index}.branch`}
                control={control}
                render={({ field }) => {
                  const error = get(errors, `education.${index}.branch`) as any;
                  return (
                    <TextField
                      {...field}
                      label="Branch / Major"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name={`education.${index}.institution`}
                control={control}
                render={({ field }) => {
                  const error = get(
                    errors,
                    `education.${index}.institution`
                  ) as any;
                  return (
                    <TextField
                      {...field}
                      label="Institution / University"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name={`education.${index}.startDate`}
                control={control}
                render={({ field }) => {
                  const error = get(
                    errors,
                    `education.${index}.startDate`
                  ) as any;
                  return (
                    <TextField
                      {...field}
                      label="Start Date"
                      fullWidth
                      type="month"
                      InputLabelProps={{ shrink: true }}
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name={`education.${index}.endDate`}
                control={control}
                render={({ field }) => {
                  const error = get(
                    errors,
                    `education.${index}.endDate`
                  ) as any;
                  return (
                    <TextField
                      {...field}
                      label="End Date"
                      type="month"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name={`education.${index}.cgpa`}
                control={control}
                render={({ field }) => {
                  const error = get(errors, `education.${index}.cgpa`) as any;
                  return (
                    <TextField
                      {...field}
                      label="CGPA / Percentage"
                      fullWidth
                      type="number"
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </section>
  );
};

export default EducationForm;
