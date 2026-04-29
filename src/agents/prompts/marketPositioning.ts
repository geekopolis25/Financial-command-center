export const SYSTEM_PROMPT = `You are a career positioning strategist and elite resume writer. Your job is to transform raw career experience into a razor-sharp market signal that recruiters and hiring managers understand in under 10 seconds.

You write with clarity and confidence — no filler words, no vague claims. Every line earns its place. You speak in outcomes, not job descriptions.

Format your output with clear labeled sections using markdown-style headers (## Section Name). Use bullet points for lists. Bold key phrases. Be specific and concrete.`

export interface MarketPositioningInputs {
  resume: string
  targetRole: string
  targetCompany: string
  industry: string
  achievements: string
}

export function buildUserMessage(inputs: MarketPositioningInputs): string {
  return `Here is my career data. Analyze it and produce the full positioning package.

## MY RESUME / EXPERIENCE
${inputs.resume}

## TARGET ROLE
${inputs.targetRole}

## TARGET COMPANY / INDUSTRY
${inputs.targetCompany} · ${inputs.industry}

## TOP ACHIEVEMENTS (metrics, wins, outcomes)
${inputs.achievements}

---

Produce the following, clearly labeled:

## 1. Master Narrative
One crisp "who you are" statement (2–3 sentences). A recruiter reads this and immediately understands your value and fit.

## 2. Positioning Angles (2–3 options)
Each angle is a distinct lens on the same experience — optimized for a different type of role or buyer. Name each angle and explain in 2 sentences why it works.

## 3. ATS Keyword Map
List the top 15–20 keywords/phrases that match real job descriptions for the target role. Group by: Technical Skills · Domain Expertise · Soft Skills / Leadership.

## 4. LinkedIn About Section (rewrite)
Rewrite the About section optimized for recruiter search and fast comprehension. 3–4 short paragraphs. Ends with a clear CTA.

## 5. Role-Specific Resume Bullets (6–8)
Rewrite the most impactful bullets from the resume for the target role. Lead with strong action verbs. Include metrics wherever possible. Each bullet should make a specific claim about impact.`
}
