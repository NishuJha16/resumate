import { Typography } from "@mui/material";
import { parse, format, isValid } from "date-fns";

const ResumePreview = ({ data }: { data: any }) => {
  const {
    personal,
    summary,
    skills,
    experience,
    education,
    projects,
    certifications,
  } = data;

  const skillList = skills
    ?.split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const getPlaceHolder = (text: string) => {
    return <span style={{ color: "#888" }}>{text}</span>;
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const parsedDate = parse(date, "yyyy-MM", new Date());

    if (!isValid(parsedDate)) return "";

    return format(parsedDate, "MMMM, yyyy");
  };

  return (
    <div
      className="px-6 py-4 font-sans flex flex-col gap-2 text-sm min-h-full h-fit space-y-6 "
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
      id="resume-preview"
    >
      {/* Personal Info */}
      <div className="flex flex-col gap-1 mb-0">
        <h1 className="text-xl font-bold text-center">
          {personal?.fullName || getPlaceHolder("Your Name")}
        </h1>
        <Typography
          variant="body2"
          mb={1}
          className="flex gap-1 flex-wrap justify-center items-center"
        >
          <span>
            {personal?.email || getPlaceHolder("youremail@email.com")}
          </span>
          <span>|</span>
          <span>{personal?.phone || getPlaceHolder("xxxx234xxx")}</span>
          <span>|</span>
          <span>{personal?.place || getPlaceHolder("Place, country")}</span>

          {personal.github && (
            <>
              <span>|</span>
              <a href={personal.github} target="_blank" rel="noreferrer">
                {personal?.github || getPlaceHolder("github.com")}
              </a>
            </>
          )}
          {personal.linkedin && (
            <>
              <span>|</span>
              <a href={personal.linkedin} target="_blank" rel="noreferrer">
                {personal?.linkedin || getPlaceHolder("linkedIn.com")}
              </a>
            </>
          )}
          {personal.otherUrl && (
            <>
              <span>|</span>
              <a href={personal.otherUrl} target="_blank" rel="noreferrer">
                {personal?.otherUrl || getPlaceHolder("otherUrl.com")}
              </a>
            </>
          )}
        </Typography>
        <div className="flex flex-wrap gap-1  text-xs"></div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold border-b">
            Professional Summary
          </h2>
          <p className="text-xs">{summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 &&
        Object.values(education[0]).some(
          (value: any) => value.trim() !== ""
        ) && (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold border-b">Education</h2>
            {education.map((edu: any, i: number) => (
              <div key={i} className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {edu.degree},{" "}
                    <span className="font-normal">{edu.branch}</span>
                  </h3>
                  <p className="italic text-sm">
                    {formatDate(edu.startDate)}– {formatDate(edu.endDate)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>{edu.institution}</p>
                  <p className="text-sm">CGPA/Percentage: {edu.cgpa}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Experience */}
      {experience.length > 0 &&
        Object.values(experience[0]).some(
          (value: any) => value.trim() !== ""
        ) && (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold border-b">Experience</h2>
            {experience.map((exp: any, i: number) => (
              <div key={i} className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {exp.role} — {exp.company}
                  </h3>
                  <p className="italic text-sm">
                    {formatDate(exp.startDate)}–{formatDate(exp.endDate)},
                    {exp.location}
                  </p>
                </div>
                <p
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: exp?.description }}
                />

                {exp.techStack && (
                  <p className="italic text-sm">Tech Used: {exp.techStack}</p>
                )}
              </div>
            ))}
          </div>
        )}

      {/* Skills */}
      {skillList.length > 0 && (
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold border-b">Skills</h2>
          <ul className="list-disc list-inside grid grid-cols-2 gap-x-8">
            {skillList.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 &&
        Object.values(projects[0]).some(
          (value: any) => value.trim() !== ""
        ) && (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold border-b">Projects</h2>
            {projects.map((proj: any, i: number) => (
              <div key={i} className="mt-2 space-y-1">
                <h3 className="font-semibold">{proj.title}</h3>
                {proj.link && <a href={proj.link}>{proj.link}</a>}
                <p
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: proj?.description }}
                />
              </div>
            ))}
          </div>
        )}

      {certifications.length > 0 &&
        Object.values(certifications[0]).some(
          (value: any) => value.trim() !== ""
        ) && (
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold border-b">Certifications</h2>
            {certifications.map((cert: any, i: number) => (
              <div key={i} className="mt-2 space-y-1">
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="italic text-sm">
                  {cert.issuer} —{formatDate(cert?.date)}
                </p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default ResumePreview;
