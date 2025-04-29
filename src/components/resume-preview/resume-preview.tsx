import {
  PersonalInfoPreview,
  SummaryPreview,
  SkillsPreview,
  EducationPreview,
  ExperiencePreview,
  ProjectsPreview,
  CertificationsPreview,
} from "./resume-preview-components";
import { useEffect, useState } from "react";

const sectionComponents = [
  { id: "personal", label: "Personal Info", component: PersonalInfoPreview },
  { id: "summary", label: "Professional Summary", component: SummaryPreview },
  { id: "skills", label: "Skills", component: SkillsPreview },
  { id: "education", label: "Education", component: EducationPreview },
  { id: "experience", label: "Experience", component: ExperiencePreview },
  { id: "projects", label: "Projects", component: ProjectsPreview },
  {
    id: "certifications",
    label: "Certifications",
    component: CertificationsPreview,
  },
];

const ResumePreview = ({ data }: { data: any }) => {
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    setSections(sectionComponents);
  }, []);

  return (
    <div
      className="px-6 py-4 font-sans flex flex-col gap-2 text-sm min-h-full h-fit space-y-6 "
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
      id="resume-preview"
    >
      {sections.map(({ id, component: SectionComponent }) => (
        <div key={id}>
          <SectionComponent {...data} />
        </div>
      ))}
    </div>
  );
};

export default ResumePreview;
