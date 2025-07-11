import { Fragment, useEffect, useRef, useState } from "react";
import ResumePreviewImage from "./ResumePreviewImage";
import { pdf } from "@react-pdf/renderer";
import TemplateOne from "./templateOne";
import PreviewHeader from "./preview-header";
import { isEqual } from "lodash";

const ResumePreviewParent = ({
  data,
  steps,
  activeStep = 0,
}: {
  data: any;
  steps?: number[];
  activeStep?: number;
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

  useEffect(() => {
    const hasDataChanged = !isEqual(previousData.current, data);
    if (hasDataChanged) {
      previousData.current = data;
      generatePdfBlob();
    }
  }, [activeStep, steps]);

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
      {blobUrl && <ResumePreviewImage file={blobUrl} />}
    </Fragment>
  );
};

export default ResumePreviewParent;
