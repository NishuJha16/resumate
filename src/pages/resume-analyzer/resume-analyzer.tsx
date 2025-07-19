import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { getDocument } from "pdfjs-dist";
import "../../pdfWorker";
import { ATSFeedback } from "../../components/common/atsParser";
import ATSResultView from "./ats-score-preview";
import { CloudUpload } from "@mui/icons-material";

export function extractJSONFromMarkdown(responseText: string): any | null {
  try {
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)```/);
    if (!jsonMatch || !jsonMatch[1]) return null;

    const jsonText = jsonMatch[1].trim();
    return JSON.parse(jsonText);
  } catch (e) {
    console.error("Failed to parse JSON from markdown response:", e);
    return null;
  }
}

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

    const prompt = `
    You are an expert Applicant Tracking System (ATS) analyzer.
    Analyze the resume text below and respond **only in valid JSON format**, with these exact keys:
    
    {
      "score": number (0-100),
      "strengths": string[],
      "weaknesses": string[],
      "topSkills": string[],
      "suggestions": string[]
    }
    
    Resume Text:
    """${resumeText}"""
    `;

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemma-3-4b-it:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const markdownWrapped =
        response.data.choices?.[0]?.message?.content || "";
      const parsed = extractJSONFromMarkdown(markdownWrapped);
      setParsedResult(parsed);
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ p: 3, overflowY: "auto", width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Resume ATS Analyzer
      </Typography>
      <Box className="flex flex-col items-center">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
          hidden
        />

        <CloudUpload
          color="warning"
          sx={{
            fontSize: 64,
            cursor: "pointer",
          }}
          onClick={() => fileInputRef.current?.click()}
        />
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {selectedFileName
            ? `${selectedFileName}`
            : "Upload your resume in PDF format to analyze its ATS compatibility."}
        </Typography>

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
      </Box>

      {parsedResult && <ATSResultView parsedResult={parsedResult} />}
    </Box>
  );
}
