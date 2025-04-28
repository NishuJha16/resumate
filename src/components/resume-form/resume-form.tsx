import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { resumeSchema } from "./schema";
import { useEffect, useState } from "react";
import ResumeFormStepper from "../resume-stepper.tsx/resume-stepper";

const defaultValues = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    github: "",
    otherUrl: "",
    place: "",
  },
  summary: "",
  education: [
    {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      branch: "",
      cgpa: "",
    },
  ],
  experience: [
    {
      company: "",
      role: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      techUsed: "",
    },
  ],
  skills: "",
  projects: [
    {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      link: "",
    },
  ],
  certifications: [
    {
      name: "",
      issuer: "",
      date: "",
    },
  ],
};

const LOCAL_STORAGE_KEY = "resumeFormData";

const ResumeForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const methods = useForm({
    resolver: yupResolver(resumeSchema),
    defaultValues,
    mode: "onChange",
  });

  const { watch, reset } = methods;

  const onSubmit = (data: any) => {
    console.log("📝 Resume Data:", data);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      reset(JSON.parse(savedData));
    }
  }, [reset]);

  // Watch for any changes and save to localStorage
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FormProvider {...methods}>
      <div className="flex gap-3 w-full p-4 ">
        <Box className="flex-[2] h-[100%] !px-0">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
            <ResumeFormStepper
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          </form>
        </Box>
      </div>
    </FormProvider>
  );
};

export default ResumeForm;
