import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { Download, Save, Sync } from "@mui/icons-material";
import { useState } from "react";
import useIsMobile from "../common/useMobile";
import { createResume } from "../../supabase/methods";
import TemplateSwitcher from "../common/template-switcher/template-switcher";

const PreviewHeader = ({
  formData,
  handleSync,
  handleDownload,
  onFileNameChange,
  currentTemplate,
  updateCurrentTemplate,
  steps,
}: any) => {
  const [resumeName, setResumeName] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [resumeNameError, setResumeNameError] = useState<string>("");

  const handleSave = async () => {
    if (resumeName) {
      setIsSaving(true);
      const steps = localStorage.getItem("STEPS");
      try {
        await createResume(
          formData,
          { steps: steps ? JSON.parse(steps) : [0, 1, 2, 3, 4, 5, 6] },
          true,
          resumeName,
          currentTemplate
        );
      } catch (error) {
        console.error("Error saving resume:", error);
      } finally {
        setIsSaving(false);
      }
    } else {
      setResumeNameError("Please enter resume name to save this version");
    }
  };

  const isMobile = useIsMobile();

  return (
    <div className="flex items-start gap-2 justify-between w-full bg-white dark:bg-[rgb(24,124,120,0.2)] p-1">
      <div className="flex gap-2 items-start">
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
        <IconButton
          className="!p-1 !text-xs !capitalize !border !rounded-sm"
          onClick={handleSave}
          aria-label="Save"
          color="primary"
        >
          {isSaving ? <CircularProgress className="!w-6 !h-6" /> : <Save />}
        </IconButton>
      </div>
      <div className="flex gap-2">
        <TemplateSwitcher
          currentTemplate={currentTemplate}
          updateCurrentTemplate={updateCurrentTemplate}
          data={formData}
          steps={steps}
        />

        <IconButton
          className="!p-1 !text-xs !capitalize !border !rounded-sm"
          onClick={handleSync}
          aria-label="Sync"
          color="primary"
        >
          <Sync />
        </IconButton>
        <Button
          className="!p-1 !text-xs !capitalize"
          aria-label="Download"
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
