import { Button, TextField } from "@mui/material";
import { Download, Save } from "@mui/icons-material";
import html2pdf from "html2pdf.js";
import { useState } from "react";

const PreviewHeader = ({ formData }: any) => {
  const [resumeName, setResumeName] = useState<string>("");
  const [saveButtonText, setSaveButtonText] = useState<string>("Save");
  const [resumeNameError, setResumeNameError] = useState<string>("");
  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");
    const opt = {
      margin: 8,
      filename: `${resumeName ? resumeName : "resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: {
        mode: ["legacy"],
        putTotalPages: true,
        // mode: ["avoid-all", "css", "legacy"],
      },
    };
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("Failed to generate PDF", err);
    }
  };

  const handleSave = () => {
    if (resumeName) {
      setSaveButtonText("Saving...");
      const savedResumes = localStorage.getItem("SAVED_RESUMES");
      const steps = localStorage.getItem("STEPS");
      let previousResumes = [];
      if (savedResumes) {
        previousResumes = JSON.parse(savedResumes) ?? [];
      }
      localStorage.setItem(
        "SAVED_RESUMES",
        JSON.stringify([
          ...previousResumes,
          {
            name: resumeName,
            formData,
            lastModified: new Date(),
            steps: steps ? JSON.parse(steps) : [0, 1, 2, 3, 4, 5, 6],
          },
        ])
      );
      setTimeout(() => {
        setSaveButtonText("Save");
      }, 1000);
    } else {
      setResumeNameError("Please enter resume name to save this version");
    }
  };

  return (
    <div className="flex items-end gap-2 justify-between w-full bg-white dark:bg-[rgb(24,124,120,0.2)] p-1">
      <div className="flex flex-col gap-1">
        <TextField
          value={resumeName}
          onChange={(e) => {
            setResumeName(e.target.value);
            setResumeNameError("");
          }}
          placeholder="Enter Resume name"
        />
        {resumeNameError && (
          <div className="text-red-500 text-[10px]">{resumeNameError}</div>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          className=" mb-4 !text-xs !capitalize"
          aria-label="Save"
          color="primary"
          variant="outlined"
          startIcon={<Save />}
          onClick={handleSave}
        >
          {saveButtonText}
        </Button>
        <Button
          className=" mb-4 !text-xs !capitalize"
          onClick={handleDownload}
          aria-label="Download"
          color="primary"
          variant="outlined"
          startIcon={<Download />}
        >
          Download
        </Button>
      </div>
    </div>
  );
};
export default PreviewHeader;
