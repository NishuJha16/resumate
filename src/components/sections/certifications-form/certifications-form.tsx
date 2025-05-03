import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import get from "lodash.get";

const CertificationsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const handleAddCertification = () => {
    append({ name: "", issuer: "", date: "" });
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
            Certifications
          </Typography>
          <Typography variant="body1">Enter your certifications</Typography>
        </div>
        <Button
          variant="outlined"
          size="small"
          className="!text-xs !capitalize"
          startIcon={<Add />}
          onClick={handleAddCertification}
        >
          Add
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
                name={`certifications.${index}.name`}
                control={control}
                render={({ field }) => {
                  const error = get(
                    errors,
                    `certifications.${index}.name`
                  ) as any;
                  return (
                    <TextField
                      {...field}
                      label="Certification Name"
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
                name={`certifications.${index}.issuer`}
                control={control}
                render={({ field }) => {
                  const error = get(
                    errors,
                    `certifications.${index}.issuer`
                  ) as any;
                  return (
                    <TextField
                      {...field}
                      label="Issuer"
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
                name={`certifications.${index}.date`}
                control={control}
                render={({ field }) => {
                  const error = get(
                    errors,
                    `certifications.${index}.date`
                  ) as any;
                  return (
                    <TextField
                      {...field}
                      label="Issued Date"
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
          </Grid>
        </Box>
      ))}
    </section>
  );
};

export default CertificationsForm;
