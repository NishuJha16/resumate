import {
  SummaryPreview,
  SkillsPreview,
  ExperiencePreview,
  ProjectsPreview,
  CertificationsPreview,
  getPlaceHolder,
  formatDate,
} from "./resume-preview-components";
import { useEffect, useMemo, useState } from "react";
import styles from "./resume-preview.module.scss";

const PersonalInfoPreview = ({ personal }: { personal: any }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">
        {personal?.fullName || getPlaceHolder("Your Name")}
      </h1>
      <div className="text-xs">{personal?.email}</div>
      <div className="text-xs">{personal?.place}</div>
      <a
        href={personal.linkedIn}
        target="_blank"
        rel="noreferrer"
        className="text-xs"
      >
        {personal?.linkedIn || getPlaceHolder("linkedIn.com")}
      </a>
      <a
        href={personal.github}
        target="_blank"
        rel="noreferrer"
        className="text-xs"
      >
        {personal?.github || getPlaceHolder("github.com")}
      </a>
    </div>
  );
};

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
          <div className="flex flex-col">
            <h3 className="font-semibold">
              {edu.degree}, <span className="font-normal">{edu.branch}</span>
            </h3>
            <p className="italic !text-xs">
              {formatDate(edu.startDate)}–{formatDate(edu.endDate)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="!text-xs">{edu.institution}</p>
            <p className="!text-xs">CGPA/Percentage: {edu.cgpa}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const sectionComponents = [
  {
    id: "personal",
    label: "Personal Info",
    component: PersonalInfoPreview,
    order: 0,
  },
  {
    id: "summary",
    label: "Professional Summary",
    component: SummaryPreview,
    order: 1,
  },
  { id: "skills", label: "Skills", component: SkillsPreview, order: 2 },
  {
    id: "education",
    label: "Education",
    component: EducationPreview,
    order: 3,
  },
  {
    id: "experience",
    label: "Experience",
    component: ExperiencePreview,
    order: 4,
  },
  { id: "projects", label: "Projects", component: ProjectsPreview, order: 5 },
  {
    id: "certifications",
    label: "Certifications",
    component: CertificationsPreview,
    order: 6,
  },
];

const TemplateTwo = ({
  data,
  steps,
  id,
}: {
  data: any;
  steps?: number[];
  id?: string;
}) => {
  const [initialSections, setInitialSections] = useState<any[]>([]);

  useEffect(() => {
    setInitialSections(sectionComponents);
  }, []);

  const sections = useMemo(() => {
    return steps
      ? steps?.map((index, newOrder) => {
          const updatedStep = { ...initialSections[index], order: newOrder };
          return updatedStep;
        })
      : initialSections;
  }, [steps, initialSections]);

  return (
    <div
      className={`mt-[48px] md:mt-0 text-sm min-h-ful A4 h-fit ${styles.resume_preview}`}
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
      id={id ?? "resume-preview"}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Column */}
        <div
          className="flex-1 space-y-6 p-4"
          style={{ background: "#4682b4", color: "#fff" }}
        >
          {sections
            ?.filter(({ id }) =>
              ["personal", "summary", "skills", "education"].includes(id)
            )
            .map(({ id, component: SectionComponent }, index) => (
              <div key={`${id}-${index}`}>
                {SectionComponent && <SectionComponent {...data} />}
              </div>
            ))}
        </div>

        {/* Right Column */}
        <div className="flex-[2] space-y-6 p-4">
          {sections
            ?.filter(({ id }) =>
              ["experience", "projects", "certifications"].includes(id)
            )
            .map(({ id, component: SectionComponent }, index) => (
              <div key={`${id}-${index}`}>
                {SectionComponent && <SectionComponent {...data} />}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;
