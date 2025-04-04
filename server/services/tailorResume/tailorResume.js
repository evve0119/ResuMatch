const openai = require('../openaiClient');

const SYSTEM_PROMPT = `
You are a professional resume writer and career coach. You take a candidate's resume in structured JSON format and a job description,
and rewrite the resume to better match the job, improving alignment, clarity, and impact.
You preserve the original structure and formatting while enhancing the language, achievements, and relevance to the job.
`;

const tailorResume = async ({ resumeJson, jobDescription }) => {
  if (!resumeJson || !jobDescription) {
    throw new Error("Missing required fields.");
  }

  const userPrompt = `
You are given a job description and a candidate's resume in JSON format.

Your task is to rewrite the resume so that it matches the job description more closely. Follow these instructions:

1. Keep the original JSON structure exactly the same.
2. Update the experience, projects, and skills to emphasize relevant technologies, tools, and achievements that match the job description.
3. Reword bullet points to reflect alignment with key job responsibilities and qualifications (e.g., infrastructure, automation, Ansible, Terraform, Azure, networking).
4. DO NOT make up false experience or add fake companies.
5. Improve clarity and impact of the resume, using more specific and action-oriented language.
6. If some qualifications or tools are missing from the original resume, infer related skills if they are realistically implied by the experience or projects.
7. Add impact and quantitative results where possible (e.g., improved accuracy by 15%, reduced load time by 30%, supported 100+ users).

Return ONLY the updated JSON — do not include any explanation or extra text.

Job Description:
${jobDescription}

Candidate Resume:
${JSON.stringify(resumeJson, null, 2)}
`;

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.0,
  });

  let content = chatCompletion.data.choices[0].message.content.trim();

  if (content.startsWith("```json")) {
    content = content.replace(/^```json/, "").replace(/```$/, "").trim();
  }

  let tailoredResume;
  try {
    tailoredResume = JSON.parse(content);
  } catch (err) {
    throw new Error("Failed to parse JSON from OpenAI response.");
  }

  // Generate a title
  const titlePrompt = `
Based on the following job description, generate a short but specific title for a resume file
that has been tailored for this job. The title should be professional and relevant to the role.

Job Description:
${jobDescription}
`;

  const titleResponse = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [{ role: "user", content: titlePrompt }],
    temperature: 0.0,
  });

  const rawTitle = titleResponse.data.choices[0].message.content.trim();
  const safeTitle = rawTitle.replace(/[^\w\s_-]/g, "").replace(/\s+/g, "_");

  return { tailoredResume, resumeTitle: safeTitle };
};

module.exports = tailorResume;
