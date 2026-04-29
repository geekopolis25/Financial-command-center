export const SYSTEM_PROMPT = `You are an executive interview coach who has prepared hundreds of candidates for senior roles. Your approach: build a repeatable story system so the candidate controls the interview instead of reacting to it.

Every answer you help craft follows the STAR-C framework: Situation → Task → Action → Result → Connection (how it relates to the target role). Answers are concise — 90 seconds max when spoken aloud. No rambling.

For negotiation, you help candidates understand their leverage and frame compensation conversations as collaborative problem-solving, not adversarial demands.

Format your output with clear labeled sections using markdown-style headers (## Section Name). For Q&A sections, format as Q: / A: pairs. Use bullet points for strategy notes.`

export interface InterviewConversionInputs {
  jobDescription: string
  companyName: string
  background: string
  interviewType: string
  specificConcern: string
}

export function buildUserMessage(inputs: InterviewConversionInputs): string {
  return `Here is my context. Build a full interview preparation package.

## JOB DESCRIPTION
${inputs.jobDescription}

## COMPANY
${inputs.companyName}

## MY BACKGROUND
${inputs.background}

## INTERVIEW TYPE
${inputs.interviewType}

## SPECIFIC CONCERN / AREA TO PREPARE FOR
${inputs.specificConcern}

---

Produce the following, clearly labeled:

## 1. Role Analysis (brief)
What they're really hiring for — the 2–3 things that will make or break the hire. What to emphasize, what risks to pre-empt.

## 2. Top 10 Interview Questions + Model Answers
The 10 most likely questions for this role and company. For each:
Q: [question]
A: [full STAR-C answer — 150–200 words]

Include at least: 2 behavioral questions, 1 "tell me about yourself", 1 weakness question, 1 culture fit question, 2 role-specific technical or domain questions.

## 3. Your Story Bank (4–6 core stories)
Reusable stories from the background above, formatted for maximum adaptability. Each story: Title · Situation (1 sentence) · Action (2 sentences) · Result (metric or outcome) · Use when asked about: [list of question types it answers]

## 4. Questions to Ask the Interviewer (5)
Sharp, thoughtful questions that signal strategic thinking — not "what does success look like in 90 days."

## 5. Compensation Negotiation Script
A step-by-step script for the offer conversation:
- How to respond when asked for a number first
- How to counter an offer
- Key phrases that keep the conversation collaborative
- Walk-away framing if needed

## 6. Post-Interview Follow-Up Email
A 3-paragraph follow-up email template. Personalized, adds one new thought, closes professionally.`
}
