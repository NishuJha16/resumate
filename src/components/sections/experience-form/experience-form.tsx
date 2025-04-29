import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import get from "lodash.get";
import Editor from "react-simple-wysiwyg";

const ExperienceForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const watchedTechUsed =
    useWatch({
      control,
      name: "experience", // watches the entire experience array
    }) || [];

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
            <Typography variant="h5">Experience</Typography>
            <Typography variant="body1">Enter your experience</Typography>
          </div>
        </div>
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={() =>
            append({
              company: "",
              role: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
              techUsed: "",
            })
          }
        >
          Add Experience
        </Button>
      </Box>

      {fields.map((item, index) => {
        const base = `experience[${index}]`;
        const techWatch = watchedTechUsed[index]?.techUsed || "";
        const techTags = techWatch
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);

        return (
          <Box
            key={item.id}
            mb={3}
            p={2}
            border="1px solid #ccc"
            borderRadius={2}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => remove(index)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name={`${base}.company`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Company"
                      fullWidth
                      error={!!get(errors, `${base}.company`)}
                      helperText={
                        (get(errors, `${base}.company`) as any)?.message
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name={`${base}.role`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Role"
                      fullWidth
                      error={!!get(errors, `${base}.role`)}
                      helperText={(get(errors, `${base}.role`) as any)?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name={`${base}.location`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      fullWidth
                      error={!!get(errors, `${base}.location`)}
                      helperText={
                        (get(errors, `${base}.location`) as any)?.message
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 6, md: 3 }}>
                <Controller
                  name={`${base}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Start Date"
                      type="month"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!get(errors, `${base}.startDate`)}
                      helperText={
                        (get(errors, `${base}.startDate`) as any)?.message
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 6, md: 3 }}>
                <Controller
                  name={`${base}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="End Date"
                      type="month"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!get(errors, `${base}.endDate`)}
                      helperText={
                        (get(errors, `${base}.endDate`) as any)?.message
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <label className="text-sm font-semibold">Description</label>
                <Controller
                  name={`${base}.description`}
                  control={control}
                  render={({ field }) => (
                    <Editor {...field} style={{ fontSize: 12 }} />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name={`${base}.techUsed`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Technologies Used (comma-separated)"
                      fullWidth
                      error={!!get(errors, `${base}.techUsed`)}
                      helperText={
                        (get(errors, `${base}.techUsed`) as any)?.message
                      }
                    />
                  )}
                />
                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                  {techTags.map((tech: string, i: number) => (
                    <Chip key={i} label={tech} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </section>
  );
};

export default ExperienceForm;
