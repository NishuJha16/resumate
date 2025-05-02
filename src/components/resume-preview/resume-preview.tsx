import {
  PersonalInfoPreview,
  SummaryPreview,
  SkillsPreview,
  EducationPreview,
  ExperiencePreview,
  ProjectsPreview,
  CertificationsPreview,
} from "./resume-preview-components";
import { useEffect, useMemo, useState } from "react";
import styles from "./resume-preview.module.scss";

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

const ResumePreview = ({
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
      className={`px-6 py-4 font-sans flex flex-col gap-2 text-sm min-h-full h-fit space-y-6 ${styles.resume_preview}`}
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
      id={id ?? "resume-preview"}
    >
      {sections?.map(({ id, component: SectionComponent }, index) => (
        <div key={`${id}-${index}`} className="mb-0">
          {SectionComponent && <SectionComponent {...data} />}
        </div>
      ))}
    </div>
  );
};

export default ResumePreview;
