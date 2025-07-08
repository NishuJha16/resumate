import { OpenInNew } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { parse, format, isValid } from "date-fns";

export const getPlaceHolder = (text: string) => {
  return <span style={{ color: "#888" }}>{text}</span>;
};

export const formatDate = (date: string) => {
  if (!date) return "";
  const parsedDate = parse(date, "yyyy-MM", new Date());
  if (!isValid(parsedDate)) return "";
  return format(parsedDate, "MMMM, yyyy");
};

const PersonalInfoPreview = ({ personal }: { personal: any }) => {
  return (
    <div className="flex flex-col gap-1 mb-0">
      <h1 className="text-xl font-bold text-center">
        {personal?.fullName || getPlaceHolder("Your Name")}
      </h1>
      <Typography
        variant="body2"
        mb={1}
        className="flex gap-1 flex-wrap justify-center items-center"
      >
        <span>{personal?.email || getPlaceHolder("youremail@email.com")}</span>
        <span>|</span>
        <span>{personal?.phone || getPlaceHolder("xxxx234xxx")}</span>
        <span>|</span>
        <span>{personal?.place || getPlaceHolder("Place, country")}</span>

        {personal?.github && (
          <>
            <span>|</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {personal?.github || getPlaceHolder("github.com")}
            </a>
          </>
        )}
        {personal?.linkedIn && (
          <>
            <span>|</span>
            <a
              href={personal.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {personal?.linkedIn || getPlaceHolder("linkedIn.com")}
            </a>
          </>
        )}
        {personal?.otherUrl && (
          <>
            <span>|</span>
            <a
              href={personal.otherUrl}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {personal?.otherUrl || getPlaceHolder("otherUrl.com")}
            </a>
          </>
        )}
      </Typography>
      <div className="flex flex-wrap gap-1  text-xs"></div>
    </div>
  );
};

const SkillsPreview = ({ skills }: any) => {
  const skillList = skills
    ?.split(",")
    .map((s: string) => s?.trim())
    .filter(Boolean);
  return (
    skillList.length > 0 && (
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold border-b uppercase">Skills</h2>
        <ul className="list-disc list-inside flex flex-wrap gap-2 !p-0">
          {skillList.map((skill: string, i: number) => (
            <li
              key={i}
              className="list-none nowrap py-[4px] px-2 rounded-sm !text-xs"
              style={{ background: "rgba(55, 84, 109, 0.2)" }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

const SummaryPreview = ({ summary }: any) => {
  return (
    summary && (
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold border-b uppercase">
          Professional Summary
        </h2>
        <p className="text-xs">{summary}</p>
      </div>
    )
  );
};

// EDUCATION
const EducationPreview = ({ education }: { education: any[] }) => {
  if (
    !education.length ||
    !Object.values(education[0]).some((value: any) => value?.trim() !== "")
  )
    return null;

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-semibold border-b uppercase">Education</h2>
      {education.map((edu, i) => (
        <div key={i}>
          <div className="flex justify-between">
            <h3 className="font-semibold">
              {edu.degree}, <span className="font-normal">{edu.branch}</span>
            </h3>
            <p className="italic text-sm">
              {formatDate(edu.startDate)}–{formatDate(edu.endDate)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>{edu.institution}</p>
            <p className="text-sm">CGPA/Percentage: {edu.cgpa}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// EXPERIENCE
const ExperiencePreview = ({ experience }: { experience: any[] }) => {
  if (
    !experience.length ||
    !Object.values(experience[0])?.some(
      (value: any) => (typeof value === "string" ? value?.trim() : "") !== ""
    )
  )
    return null;

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-semibold border-b uppercase">Experience</h2>
      {experience.map((exp, i) => (
        <div key={i}>
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <h3 className="font-semibold">
                {exp.role}, {exp.company}
              </h3>
              {exp?.location && <p>{exp.location}</p>}
            </div>
            <p className="italic text-sm">
              {formatDate(exp.startDate)}–
              {exp.isPresent ? "Present" : formatDate(exp.endDate)}
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
  );
};

// PROJECTS
const ProjectsPreview = ({ projects }: { projects: any[] }) => {
  if (
    !projects.length ||
    !Object.values(projects[0]).some((value: any) => value?.trim() !== "")
  )
    return null;

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-semibold border-b uppercase">Projects</h2>
      {projects.map((proj, i) => (
        <div key={i} className="space-y-1">
          <div className="font-semibold flex items-center gap-2">
            <h3>{proj.title}</h3>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                className="h-3 flex items-center"
              >
                <OpenInNew
                  fontSize="small"
                  fontWeight={600}
                  className="!w-3 !h-3"
                />
              </a>
            )}
          </div>

          <p
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: proj?.description }}
          />
        </div>
      ))}
    </div>
  );
};

// CERTIFICATIONS
const CertificationsPreview = ({
  certifications,
}: {
  certifications: any[];
}) => {
  if (
    !certifications.length ||
    !Object.values(certifications[0]).some((value: any) => value?.trim() !== "")
  )
    return null;

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-semibold border-b uppercase">
        Certifications
      </h2>
      {certifications.map((cert, i) => (
        <div key={i} className="space-y-1">
          <h3 className="font-semibold">{cert.name}</h3>
          <p className="italic text-sm">
            {cert.issuer} — {formatDate(cert?.date)}
          </p>
        </div>
      ))}
    </div>
  );
};

export {
  PersonalInfoPreview,
  SkillsPreview,
  SummaryPreview,
  EducationPreview,
  ExperiencePreview,
  ProjectsPreview,
  CertificationsPreview,
};
