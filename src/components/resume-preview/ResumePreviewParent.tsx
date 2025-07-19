import { Fragment, useEffect, useRef, useState } from "react";
import ResumePreviewImage from "./ResumePreviewImage";
import { pdf } from "@react-pdf/renderer";
import TemplateOne from "./templateOne";
import PreviewHeader from "./preview-header";
import { isEqual } from "lodash";
import { LOCAL_STORAGE_KEY } from "../../pages/resume-form/resume-form";
import { getCurrentResume, updateResume } from "../../supabase/methods";

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
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("resume.pdf");
  const previousData = useRef<any>(null);

  const generatePdfBlob = async () => {
    try {
      if (!data || Object.keys(data).length === 0) return;

      const blob = await pdf(
        <TemplateOne data={data} steps={steps} />
      ).toBlob();

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
        const resumeData = await getCurrentResume();
        updateResume(
          resumeData?.id,
          JSON.parse(localData!),
          { steps: steps },
          true,
          resumeData?.resume_name
        );
      }
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  useEffect(() => {
    const hasDataChanged = !isEqual(previousData.current, data);
    if (hasDataChanged) {
      previousData.current = data;
      generatePdfBlob();
      handleUpdateResume();
    }
  }, [activeStep, steps, loading]);

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
      />
      {blobUrl && <ResumePreviewImage loading={loading} file={blobUrl} />}
    </Fragment>
  );
};

export default ResumePreviewParent;
