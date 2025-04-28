import { Box, Typography, Divider, Stack } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

const getPlaceHolder = (text: string) => {
  return <span style={{ color: "#888" }}>{text}</span>;
};

const ResumePreview = ({ theme }: { theme: any }) => {
  const { control } = useFormContext();

  const personal = useWatch({ control, name: "personal" });
  const summary = useWatch({ control, name: "summary" });
  const skills = useWatch({ control, name: "skills" });
  const experience = useWatch({ control, name: "experience" }) || [];
  const education = useWatch({ control, name: "education" }) || [];
  const projects = useWatch({ control, name: "projects" }) || [];
  const certifications = useWatch({ control, name: "certifications" }) || [];

  const skillList =
    skills
      ?.split(",")
      .map((s: string) => s.trim())
      .filter(Boolean) || [];

  return (
    <Box
      sx={{
        backgroundColor: theme.background,
        color: theme.text,
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        borderRadius: 0.5,
        boxShadow: 2,
        p: 2,
        flex: 1,
        m: 1,
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ color: theme.heading }}
        className="text-center"
      >
        {personal?.fullName || "Your Name"}
      </Typography>
      <Typography
        variant="body2"
        mb={1}
        className="flex gap-1 flex-wrap justify-center items-center"
      >
        <span>
          {personal?.email || getPlaceHolder("youremail@email.com")} |
        </span>
        <span>{personal?.phone || getPlaceHolder("xxxx234xxx")} |</span>
        <span>{personal?.place || getPlaceHolder("Place, country")} |</span>
        {personal.github && (
          <a href={personal.github} target="_blank" rel="noreferrer">
            {personal?.github || getPlaceHolder("github.com")} |
          </a>
        )}
        {personal.linkedin && (
          <a href={personal.linkedin} target="_blank" rel="noreferrer">
            {personal?.linkedin || getPlaceHolder("linkedIn.com")} |
          </a>
        )}
        {personal.otherUrl && (
          <a href={personal.otherUrl} target="_blank" rel="noreferrer">
            {personal?.otherUrl || getPlaceHolder("otherUrl.com")} |
          </a>
        )}
      </Typography>

      <Divider sx={{ my: 2, borderColor: theme.divider }} />

      {summary && (
        <>
          <Typography variant="h6" sx={{ color: theme.heading }}>
            Professional Summary
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            {summary}
          </Typography>
          <Divider sx={{ my: 2, borderColor: theme.divider }} />
        </>
      )}

      {skillList.length > 0 && (
        <>
          <Typography variant="h6" sx={{ color: theme.heading }}>
            Skills
          </Typography>
          <ul className="pl-1 mt-4 flex gap-2 flex-wrap">
            {skillList.map((skill: string, i: number) => (
              <li key={i}>
                <Typography
                  variant="body2"
                  className="bg-gray-200 px-2 py-[0.5] rounded"
                >
                  {skill}
                </Typography>
              </li>
            ))}
          </ul>
          <Divider sx={{ my: 2, borderColor: theme.divider }} />
        </>
      )}

      {experience.length > 0 && (
        <>
          <Typography variant="h6" sx={{ color: theme.heading }}>
            Experience
          </Typography>
          <Stack spacing={1} mt={1}>
            {experience.map((exp: any, i: number) => (
              <Box key={i}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exp.role} — {exp.company}
                </Typography>
                <Typography variant="body2" fontStyle="italic">
                  {exp.startDate} – {exp.endDate} | {exp.location}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {exp.description}
                </Typography>
                {exp.techStack && (
                  <Typography variant="caption" sx={{ color: theme.heading }}>
                    Tech Used: {exp.techStack}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
          <Divider sx={{ my: 2, borderColor: theme.divider }} />
        </>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <>
          <Typography variant="h6" sx={{ color: theme.heading }}>
            Education
          </Typography>
          <Stack spacing={1} mt={1}>
            {education.map((edu: any, i: number) => (
              <Box key={i}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.degree} — {edu.institution}
                </Typography>
                <Typography variant="body2" fontStyle="italic">
                  {edu.startDate} – {edu.endDate}
                </Typography>
                <Typography variant="body2">{edu.description}</Typography>
              </Box>
            ))}
          </Stack>
          <Divider sx={{ my: 2, borderColor: theme.divider }} />
        </>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <>
          <Typography variant="h6" sx={{ color: theme.heading }}>
            Projects
          </Typography>
          <Stack spacing={1} mt={1}>
            {projects.map((proj: any, i: number) => (
              <Box key={i}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {proj.title}{" "}
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer">
                      🔗
                    </a>
                  )}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {proj.description}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Divider sx={{ my: 2, borderColor: theme.divider }} />
        </>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <>
          <Typography variant="h6" sx={{ color: theme.heading }}>
            Certifications
          </Typography>
          <Stack spacing={1} mt={1}>
            {certifications.map((cert: any, i: number) => (
              <Box key={i}>
                <Typography variant="subtitle1">{cert.name}</Typography>
                <Typography variant="body2" fontStyle="italic">
                  {cert.issuer} — {cert.date}
                </Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ResumePreview;
