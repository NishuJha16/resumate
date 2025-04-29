import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import get from "lodash.get";
import Editor from "react-simple-wysiwyg";

const ProjectsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const handleAddProject = () => {
    append({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      link: "",
    });
  };

  console.log("ProjectsForm", fields);

  return (
    <section className="flex flex-col gap-8">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Typography variant="h5">Projects</Typography>
            <Typography variant="body1">Enter your projects</Typography>
          </div>
        </div>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={handleAddProject}
        >
          Add Project
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
          component={Paper}
        >
          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => remove(index)} color="error">
                <Delete />
              </IconButton>
            </Box>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name={`projects.${index}.title`}
                control={control}
                render={({ field }) => {
                  const error = get(errors, `projects.${index}.title`) as any;
                  return (
                    <TextField
                      {...field}
                      label="Project Title"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <label className="text-sm font-semibold">Description</label>
              <Controller
                name={`projects.${index}.description`}
                control={control}
                render={({ field }) => (
                  <Editor {...field} style={{ fontSize: 12 }} />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name={`projects.${index}.startDate`}
                control={control}
                render={({ field }) => {
                  const error = get(
                    errors,
                    `projects.${index}.startDate`
                  ) as any;
                  return (
                    <TextField
                      {...field}
                      label="Start Date"
                      type="month"
                      fullWidth
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
                name={`projects.${index}.endDate`}
                control={control}
                render={({ field }) => {
                  const error = get(errors, `projects.${index}.endDate`) as any;
                  return (
                    <TextField
                      {...field}
                      label="End Date"
                      type="month"
                      fullWidth
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
                name={`projects.${index}.link`}
                control={control}
                render={({ field }) => {
                  const error = get(errors, `projects.${index}.link`) as any;
                  return (
                    <TextField
                      {...field}
                      label="Project Link"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
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

export default ProjectsForm;
