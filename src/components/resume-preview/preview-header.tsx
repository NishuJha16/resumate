import { Button, TextField } from "@mui/material";
import { Download } from "@mui/icons-material";
import html2pdf from "html2pdf.js";
import { useState } from "react";

const PreviewHeader = () => {
  const [resumeName, setResumeName] = useState<string>("");
  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");
    console.log("Element", element);
    const opt = {
      margin: 0,
      filename: `${resumeName ? resumeName : "resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".pdf-page",
      },
    };
    try {
      await html2pdf().set(opt).from(element).save();
      console.log("Download complete");
    } catch (err) {
      console.error("Failed to generate PDF", err);
    }
  };
  return (
    <div className="flex items-end justify-between w-full bg-white dark:bg-gray-900 p-1">
      <TextField
        value={resumeName}
        onChange={(e) => setResumeName(e.target.value)}
        placeholder="Enter Resume name"
      />
      <Button
        className=" mb-4 !text-xs"
        onClick={handleDownload}
        aria-label="Download"
        color="primary"
        variant="outlined"
        startIcon={<Download />}
      >
        Download
      </Button>
    </div>
  );
};
export default PreviewHeader;
