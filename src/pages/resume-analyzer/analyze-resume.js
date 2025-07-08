const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY; 

export async function analyzeResume(resumeText) {
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

  const response = await fetch("https://free-chatgpt-api.p.rapidapi.com/chat-completion-one", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
