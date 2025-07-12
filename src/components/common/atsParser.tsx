export interface ATSFeedback {
  score: number;
  strengths: string[];
  weaknesses: string[];
  topSkills: string[];
  suggestions: string[];
}

export function parseATSFeedback(text: string): ATSFeedback {
  const getSectionText = (label: string, nextLabel?: string): string => {
    const start = text.indexOf(`**${label}:**`);
    if (start === -1) return "";

    const end = nextLabel
      ? text.indexOf(`**${nextLabel}:**`, start)
      : text.length;

    return text.slice(start, end).replace(`**${label}:**`, "").trim();
  };

  const parseList = (raw: string): string[] => {
    return raw
      .split(/\d+\.\s*/)
      .map((line) =>
        line
          .replace(/\*\*/g, "")
          .replace(/^[:\-–•\s]+/, "")
          .trim()
      )
      .filter((line) => line.length > 5);
  };

  const scoreMatch = text.match(/\*\*ATS Score:\s*(\d+)\//);
  const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

  return {
    score,
    strengths: parseList(getSectionText("Strengths", "Weaknesses")),
    weaknesses: parseList(getSectionText("Weaknesses", "Top 5 Skills")),
    topSkills: parseList(
      getSectionText("Top 5 Skills", "Suggestions for Improvement")
    ),
    suggestions: parseList(getSectionText("Suggestions for Improvement")),
  };
}
