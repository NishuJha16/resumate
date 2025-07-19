import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { resumeSchema } from "./schema";
import { useEffect, useState } from "react";
import ResumeFormStepper, {
  defaultSteps,
} from "../../components/resume-stepper.tsx/resume-stepper";
import { createResume, getResumes } from "../../supabase/methods";
import LoadingIcon from "../../assets/loader.svg";

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
      isPresent: false,
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

export const LOCAL_STORAGE_KEY = "resumeFormData";

const ResumeForm = () => {
  const [activeStep, setActiveStep] = useState("personal");
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(resumeSchema),
    defaultValues,
    mode: "onChange",
  });

  const { watch, reset } = methods;

  const handleInitialFormData = async () => {
    setLoading(true);
    try {
      const data = await getResumes();
      if (!data?.length) {
        createResume(defaultValues, { steps: defaultSteps }, true);
      } else {
        const latestResume = data?.[data.length - 1];
        reset({ ...latestResume?.data });
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleInitialFormData();
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <FormProvider {...methods}>
        <div className="flex gap-3 w-full p-4 ">
          <Box className="flex-[2] h-[100%] !px-0">
            <form className="h-full">
              <ResumeFormStepper
                activeStep={activeStep}
                updateStep={setActiveStep}
                loading={loading}
              />
            </form>
          </Box>
        </div>
      </FormProvider>
      {loading && (
        <Box className="flex items-center justify-center h-full w-full fixed top-0 left-0 bg-[rgba(255,255,255,0.5)] z-50 ">
          <img src={LoadingIcon} width={64} />
        </Box>
      )}
    </>
  );
};

export default ResumeForm;
