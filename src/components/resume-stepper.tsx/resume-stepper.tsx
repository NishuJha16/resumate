import {
  Button,
  Box,
  LinearProgress,
  Tabs,
  Tab,
  IconButton,
  Drawer,
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
import { useEffect, useMemo, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import RearrangableLabels from "./RearrangableLabels";
import { DragIndicator } from "@mui/icons-material";
import useIsMobile from "../common/useMobile";

const formStepsMeta = [
  {
    id: "personal",
    label: "Personal Info",
    component: <PersonalInfo />,
    order: 0,
  },
  {
    id: "summary",
    label: "Professional Summary",
    component: <SummaryForm />,
    order: 1,
  },
  { id: "skills", label: "Skills", component: <SkillsForm />, order: 2 },
  {
    id: "education",
    label: "Education",
    component: <EducationForm />,
    order: 3,
  },
  {
    id: "experience",
    label: "Experience",
    component: <ExperienceForm />,
    order: 4,
  },
  { id: "projects", label: "Projects", component: <ProjectsForm />, order: 5 },
  {
    id: "certifications",
    label: "Certifications",
    component: <CertificationsForm />,
    order: 6,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      flex={1}
      overflow={"hidden"}
    >
      {value === index && children}
    </Box>
  );
}

const defaultSteps = [0, 1, 2, 3, 4, 5, 6];

const ResumeFormStepper = ({ activeStep, updateStep }: any) => {
  const [steps, setSteps] = useState(defaultSteps);
  const [value, setValue] = useState<number>(0);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [initialFormSteps, setInitialFormSteps] = useState(formStepsMeta);
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(steps);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSteps(reordered);
    localStorage.setItem("STEPS", JSON.stringify(reordered));
  };

  useEffect(() => {
    setInitialFormSteps(formStepsMeta);
  }, []);

  useEffect(() => {
    const savedSteps = localStorage.getItem("STEPS");
    if (savedSteps) {
      setSteps(JSON.parse(savedSteps));
    }
  }, []);

  const formSteps = useMemo(() => {
    return steps.map((index, newOrder) => {
      const updatedStep = { ...initialFormSteps[index], order: newOrder };
      return updatedStep;
    });
  }, [steps, initialFormSteps]);

  const isMobile = useIsMobile();

  return isMobile ? (
    <Box className="relative flex flex-1 flex-col h-full">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="BASIC DETAILS" />
          <Tab label="PREVIEW" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box className="flex h-full flex-col-reverse md:flex-col gap-4 pt-0 md:pt-2 pb-2 md:pb-0 flex-1 bg-[white] dark:bg-[rgb(24,124,120,0.2)]">
          <Box className="flex-1 overflow-y-auto px-4">
            {formSteps?.find((data) => data.id === activeStep)?.component}
          </Box>

          <Box className="flex justify-between items-center gap-8 border-t-1 border-gray-300 p-2  md:p-4 bg-[rgb(245,124,6,0.1)]">
            <Button
              disabled={activeStep === formSteps?.[0]?.id}
              onClick={() =>
                updateStep(
                  formSteps[
                    formSteps?.findIndex((val) => val.id === activeStep) - 1
                  ]?.id
                )
              }
              variant="outlined"
            >
              Back
            </Button>
            <LinearProgress
              value={
                ((formSteps?.findIndex((val) => val.id === activeStep) + 1) /
                  formSteps?.length) *
                100
              }
              variant="determinate"
              className="flex-1 rounded-2xl !h-2"
            />

            <Button
              onClick={() =>
                updateStep(
                  formSteps[
                    formSteps?.findIndex((val) => val.id === activeStep) + 1
                  ]?.id
                )
              }
              disabled={activeStep === formSteps?.[formSteps?.length - 1]?.id}
              type="button"
              variant="contained"
              className="!text-white"
            >
              Next
            </Button>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box className="flex-1 flex flex-col bg-[rgb(236,236,236)] dark:bg-[#37546D] relative min-h-[520px]">
          <PreviewHeader formData={formData} />
          <div className="flex-1 overflow-y-hidden w-full ">
            <ResumePreview data={formData} steps={steps} />
          </div>
        </Box>
      </TabPanel>
      <IconButton
        className="!absolute right-0 top-0"
        onClick={() => setShowDrawer(!showDrawer)}
      >
        <DragIndicator />
      </IconButton>
      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        anchor="right"
      >
        <RearrangableLabels
          onDragEnd={onDragEnd}
          formSteps={formSteps}
          activeStep={activeStep}
          updateStep={updateStep}
        />
      </Drawer>
    </Box>
  ) : (
    <Box className="flex gap-4 w-full h-full lg:flex-row flex-col lg:overflow-y-hidden overflow-y-auto">
      <Box className="flex flex-col-reverse md:flex-col gap-4 pt-0 md:pt-2 pb-2 md:pb-0 flex-1 bg-[white] dark:bg-[rgb(24,124,120,0.2)]">
        <Box className="flex-1 overflow-y-auto px-4">
          {formSteps?.find((data) => data.id === activeStep)?.component}
        </Box>

        <Box className="flex justify-between items-center gap-8 border-t-1 border-gray-300 p-2  md:p-4 bg-[rgb(245,124,6,0.1)]">
          <Button
            disabled={activeStep === formSteps?.[0]?.id}
            onClick={() =>
              updateStep(
                formSteps[
                  formSteps?.findIndex((val) => val.id === activeStep) - 1
                ]?.id
              )
            }
            variant="outlined"
          >
            Back
          </Button>
          <LinearProgress
            value={
              ((formSteps?.findIndex((val) => val.id === activeStep) + 1) /
                formSteps?.length) *
              100
            }
            variant="determinate"
            className="flex-1 rounded-2xl !h-2"
          />

          <Button
            onClick={() =>
              updateStep(
                formSteps[
                  formSteps?.findIndex((val) => val.id === activeStep) + 1
                ]?.id
              )
            }
            disabled={activeStep === formSteps?.[formSteps?.length - 1]?.id}
            type="button"
            variant="contained"
            className="!text-white"
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box className="flex-1 flex flex-col bg-[rgb(236,236,236)] dark:bg-[#37546D] relative min-h-[520px]">
        <PreviewHeader formData={formData} />
        <div className="flex-1 overflow-y-hidden w-full ">
          <ResumePreview data={formData} steps={steps} />
        </div>
      </Box>
      <RearrangableLabels
        onDragEnd={onDragEnd}
        formSteps={formSteps}
        activeStep={activeStep}
        updateStep={updateStep}
      />
    </Box>
  );
};

export default ResumeFormStepper;
