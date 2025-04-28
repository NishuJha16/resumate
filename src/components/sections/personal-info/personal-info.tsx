import { useFormContext, Controller } from "react-hook-form";
import { Grid, TextField, Typography } from "@mui/material";

const PersonalInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const err: any = errors.personal || {};

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col">
        <Typography variant="h5">Personal Information</Typography>
        <Typography variant="body1">Enter your personal information</Typography>
      </div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="personal.fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                fullWidth
                error={!!err?.fullName}
                helperText={err?.fullName?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="personal.email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!err?.email}
                helperText={err?.email?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="personal.phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                error={!!err?.phone}
                helperText={err?.phone?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="personal.place"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Location"
                fullWidth
                error={!!err?.location}
                helperText={err?.location?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="personal.github"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="GitHub URL"
                fullWidth
                error={!!err?.github}
                helperText={err?.github?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="personal.linkedIn"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="LinkedIn"
                fullWidth
                error={!!err?.linkedIn}
                helperText={err?.linkedIn?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="personal.otherUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Other URL"
                fullWidth
                error={!!err?.otherUrl}
                helperText={err?.otherUrl?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default PersonalInfo;
