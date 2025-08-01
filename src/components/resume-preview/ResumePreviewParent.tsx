import { Fragment, useEffect, useRef, useState } from "react";
import ResumePreviewImage from "./ResumePreviewImage";
import { pdf } from "@react-pdf/renderer";
import PreviewHeader from "./preview-header";
import { isEqual } from "lodash";
import {
  CURRENT_TEMPLATE,
  LOCAL_STORAGE_KEY,
} from "../../pages/resume-form/resume-form";
import { getResumes, updateResume } from "../../supabase/methods";
import ModernTemplate from "../templates/modern-template/modern-template";
import DefaultTemplate from "../templates/default-template/default-template";
import CompactTemplate from "../templates/compact-template/compact-template";
import ElegantTemplate from "../templates/elegant-template/elegant-template";

const ResumePreviewParent = ({
  data,
  steps,
  activeStep = 0,
  loading = false,
}: {
  data: any;
  steps?: number[];
  activeStep?: number;
  loading?: boolean;
}) => {
  const [currentTemplate, setCurrentTemplate] = useState<string>("default");
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("resume.pdf");
  const previousData = useRef<any>(null);

  const getTemplate = () => {
    switch (currentTemplate) {
      case "modern":
        return <ModernTemplate data={data} steps={steps} />;
      case "elegant":
        return <ElegantTemplate data={data} steps={steps} />;
      case "default":
        return <DefaultTemplate data={data} steps={steps} />;
      case "compact":
        return <CompactTemplate data={data} steps={steps} />;
      default:
        return <DefaultTemplate data={data} steps={steps} />;
    }
  };

  const generatePdfBlob = async () => {
    try {
      if (!data || Object.keys(data).length === 0) return;

      const blob = await pdf(getTemplate()).toBlob();

      const newUrl = URL.createObjectURL(blob);
      setBlobUrl(newUrl);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  const handleUpdateResume = async () => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        const resumeData = await getResumes();
        updateResume(
          resumeData?.[0]?.id,
          JSON.parse(localData!),
          { steps: steps },
          true,
          resumeData?.[0]?.resume_name,
          currentTemplate
        );
      }
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  useEffect(() => {
    generatePdfBlob();
    handleUpdateResume();
  }, [steps, currentTemplate]);

  useEffect(() => {
    const hasDataChanged = !isEqual(previousData.current, data);
    if (!hasDataChanged) return;
    previousData.current = data;
    generatePdfBlob();
    handleUpdateResume();
  }, [activeStep, loading]);

  useEffect(() => {
    const template = localStorage.getItem(CURRENT_TEMPLATE);
    setCurrentTemplate(template || "default");
  }, []);

  useEffect(() => {
    localStorage.setItem(CURRENT_TEMPLATE, currentTemplate);
  }, [currentTemplate]);

  const handleDownload = () => {
    if (blobUrl) {
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(blobUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  return (
    <Fragment>
      <PreviewHeader
        formData={data}
        handleDownload={handleDownload}
        handleSync={generatePdfBlob}
        onFileNameChange={setFileName}
        currentTemplate={currentTemplate}
        updateCurrentTemplate={(val: string) => setCurrentTemplate(val)}
        steps={steps}
      />
      {blobUrl && <ResumePreviewImage loading={loading} file={blobUrl} />}
    </Fragment>
  );
};

export default ResumePreviewParent;
