import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import PersonalInfo from "../sections/personal-info/personal-info";
import CertificationsForm from "../sections/certifications-form/certifications-form";
import EducationForm from "../sections/education-form/education-form";
import ExperienceForm from "../sections/experience-form/experience-form";
import ProjectsForm from "../sections/projects-form/projects-form";
import SkillsForm from "../sections/skills-form/skills-form";
import SummaryForm from "../sections/summary-form/summary-form";
import ResumePreview from "../resume-preview/resume-preview";
import { useFormContext, useWatch } from "react-hook-form";
import PreviewHeader from "../resume-preview/preview-header";

const steps = [
  "Personal Info",
  "Summary",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Certifications",
];

const ResumeFormStepper = ({ activeStep, handleNext, handleBack }: any) => {
  const { control } = useFormContext();
  const personal = useWatch({ control, name: "personal" });
  const summary = useWatch({ control, name: "summary" });
  const skills = useWatch({ control, name: "skills" });
  const experience = useWatch({ control, name: "experience" }) || [];
  const education = useWatch({ control, name: "education" }) || [];
  const projects = useWatch({ control, name: "projects" }) || [];
  const certifications = useWatch({ control, name: "certifications" }) || [];

  const formData = {
    personal,
    summary,
    skills,
    experience,
    education,
    projects,
    certifications,
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <SummaryForm />;
      case 2:
        return <EducationForm />;
      case 3:
        return <ExperienceForm />;
      case 4:
        return <SkillsForm />;
      case 5:
        return <ProjectsForm />;
      case 6:
        return <CertificationsForm />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Box className="flex gap-4 w-full h-full lg:flex-row flex-col lg:overflow-y-hidden overflow-y-auto">
      <Box className="flex flex-col gap-4 pt-2 flex-1 bg-[white] dark:bg-gray-900">
        <Box className="flex-1 overflow-y-auto px-4">
          {getStepContent(activeStep)}
        </Box>

        <Box className="flex justify-between items-center gap-8 border-t-1 border-gray-300 pt-4 pb-4 px-4 bg-[rgb(245,124,6,0.1)]">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <LinearProgress
            value={((activeStep + 1) / steps.length) * 100}
            variant="determinate"
            className="flex-1 rounded-2xl !h-2"
          />

          <Button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            type="button"
            variant="contained"
            className="!text-white"
          >
            Next
          </Button>
        </Box>
      </Box>
      <div className="flex-1 flex flex-col bg-[rgb(236,236,236)] dark:bg-[#37546D]">
        <PreviewHeader />
        <div className="flex-1 overflow-y-auto m-2">
          <ResumePreview data={formData} />
        </div>
      </div>
      <Stepper
        activeStep={activeStep}
        variant="elevation"
        className="pt-4 bg-[white] dark:bg-gray-900 px-6"
        orientation="vertical"
        connector={null}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ResumeFormStepper;
