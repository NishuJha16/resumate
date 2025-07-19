import { Button, TextField } from "@mui/material";
import { Download, Save, Sync } from "@mui/icons-material";
import { useState } from "react";
import useIsMobile from "../common/useMobile";
import { createResume } from "../../supabase/methods";

const PreviewHeader = ({
  formData,
  handleSync,
  handleDownload,
  onFileNameChange,
}: any) => {
  const [resumeName, setResumeName] = useState<string>("");
  const [saveButtonText, setSaveButtonText] = useState<string>("Save");
  const [resumeNameError, setResumeNameError] = useState<string>("");

  const handleSave = async () => {
    if (resumeName) {
      setSaveButtonText("Saving...");
      const steps = localStorage.getItem("STEPS");
      try {
        await createResume(
          formData,
          { steps: steps ? JSON.parse(steps) : [0, 1, 2, 3, 4, 5, 6] },
          true,
          resumeName
        );
      } catch (error) {
        console.error("Error saving resume:", error);
      } finally {
        setSaveButtonText("Save");
      }
    } else {
      setResumeNameError("Please enter resume name to save this version");
    }
  };

  const isMobile = useIsMobile();

  return (
    <div className="flex items-end gap-2 justify-between w-full bg-white dark:bg-[rgb(24,124,120,0.2)] p-1">
      <div className="flex flex-col gap-1">
        <TextField
          value={resumeName}
          onChange={(e) => {
            setResumeName(e.target.value);
            setResumeNameError("");
            onFileNameChange(e.target.value);
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
          {!isMobile && saveButtonText}
        </Button>
        <Button
          className=" mb-4 !text-xs !capitalize"
          onClick={handleSync}
          aria-label="Download"
          color="primary"
          variant="outlined"
          startIcon={<Sync />}
        >
          {!isMobile && "Sync"}
        </Button>
        <Button
          className=" mb-4 !text-xs !capitalize"
          aria-label="Save"
          color="primary"
          variant="outlined"
          startIcon={<Download />}
          onClick={handleDownload}
        >
          {!isMobile && "Download"}
        </Button>
      </div>
    </div>
  );
};
export default PreviewHeader;
