import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
// import axios from "axios";
import { useRef, useState } from "react";
import { getDocument } from "pdfjs-dist";
import "../../pdfWorker";
import {
  parseATSFeedback,
  ATSFeedback,
} from "../../components/common/atsParser";
import { sampleResponse } from "./sampleResponse";
import ATSResultView from "./ats-score-preview";

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [parsedResult, setParsedResult] = useState<ATSFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  async function extractTextFromPDF(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      text += pageText + "\n";
    }

    return text;
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await extractTextFromPDF(file);
      setResumeText(text);
      setSelectedFileName(file.name);
      setParsedResult(null);
      setError(null);
    } catch (err) {
      console.error("PDF error:", err);
      setError("Could not read PDF file.");
    }
  }

  async function analyzeResume() {
    if (!resumeText) return;

    setLoading(true);
    setError(null);
    setParsedResult(null);

    //     const prompt = `
    // You are a resume analyzer AI. Analyze the following resume text and return:
    // 1. ATS score (out of 100)
    // 2. Strengths
    // 3. Weaknesses
    // 4. Top 5 skills
    // 5. Suggestions for improvement

    // Resume Text:
    // ${resumeText}
    // `;

    try {
      // const response = await axios.get(
      //   "https://free-chatgpt-api.p.rapidapi.com/chat-completion-one",
      //   {
      //     params: { prompt },
      //     headers: {
      //       "x-rapidapi-key":
      //         "a240a7078bmsh2e1464212b3017dp1e5718jsnb5506cafa362",
      //       "x-rapidapi-host": "free-chatgpt-api.p.rapidapi.com",
      //     },
      //   }
      // );

      const raw = sampleResponse;
      const parsed = parseATSFeedback(raw);
      setParsedResult(parsed);
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ p: 3, overflowY: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Resume ATS Analyzer
      </Typography>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        hidden
      />
      <Button
        variant="outlined"
        component="span"
        onClick={() => fileInputRef.current?.click()}
        sx={{ mt: 2 }}
      >
        {selectedFileName
          ? `Selected: ${selectedFileName}`
          : "Choose PDF Resume"}
      </Button>

      <Button
        variant="contained"
        color="primary"
        disabled={loading || !resumeText}
        onClick={analyzeResume}
        sx={{ mt: 2, ml: 2 }}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} /> Analyzing...
          </>
        ) : (
          "Analyze Resume"
        )}
      </Button>

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {parsedResult && <ATSResultView parsedResult={parsedResult} />}
    </Box>
  );
}
