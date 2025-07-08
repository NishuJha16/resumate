import { useState } from "react";
import axios from "axios";
import { getDocument } from "pdfjs-dist";
import "../../pdfWorker"; // 👈 this sets workerSrc safely

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setAnalysis("");
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
    setAnalysis("");

    const prompt = `
You are a resume analyzer AI. Analyze the following resume text and return:
1. ATS score (out of 100)
2. Strengths
3. Weaknesses
4. Top 5 skills
5. Suggestions for improvement

Resume Text:
${resumeText}
`;

    try {
      const response = await axios.get(
        "https://free-chatgpt-api.p.rapidapi.com/chat-completion-one",
        {
          params: { prompt },
          headers: {
            "x-rapidapi-key":
              "a240a7078bmsh2e1464212b3017dp1e5718jsnb5506cafa362",
            "x-rapidapi-host": "free-chatgpt-api.p.rapidapi.com",
          },
        }
      );

      setAnalysis(
        response.data.choices?.[0]?.message?.content || response.data
      );
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Upload Resume PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br />
      <button
        disabled={loading || !resumeText}
        onClick={analyzeResume}
        style={{ marginTop: 10 }}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {analysis && (
        <pre
          style={{
            background: "#f4f4f4",
            padding: 16,
            whiteSpace: "pre-wrap",
            marginTop: 20,
          }}
        >
          {analysis}
        </pre>
      )}
    </div>
  );
}
