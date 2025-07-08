// File: api/analyze-resume.js (or .ts)

import pdfParse from "pdf-parse";
import { Buffer } from "buffer";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // ✅ Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end(); // Preflight response

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { base64pdf } = req.body;
    if (!base64pdf) {
      return res.status(400).json({ error: "Missing PDF file" });
    }

    const buffer = Buffer.from(base64pdf, "base64");
    const parsed = await pdfParse(buffer);
    const resumeText = parsed.text;

    const prompt = `
You are a resume analyzer AI. Analyze the resume text and return:
1. ATS score (out of 100)
2. Strengths
3. Weaknesses
4. Top 5 skills
5. Suggestions for improvement

Resume Text:
${resumeText}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ analysis: result });
  } catch (error) {
    console.error("🔥 API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
