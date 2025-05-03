import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Box, Chip, TextField, Typography } from "@mui/material";
import get from "lodash.get";

const SkillsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const skillsString = useWatch({ name: "skills", control }) || "";
  const skillList = skillsString
    .split(",")
    .map((s: string) => s?.trim())
    .filter((s: string) => s.length > 0);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <Typography variant="h5">Skills</Typography>
          <Typography variant="body1">Enter your skills</Typography>
        </div>
      </div>
      <Controller
        name="skills"
        control={control}
        render={({ field }) => {
          const error: any = get(errors, "skills");
          return (
            <>
              <TextField
                {...field}
                label="Skills (comma-separated)"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
              {skillList.length > 0 && (
                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  {skillList?.map((skill: any, index: number) => (
                    <Chip key={index} label={skill} />
                  ))}
                </Box>
              )}
            </>
          );
        }}
      />
    </section>
  );
};

export default SkillsForm;
