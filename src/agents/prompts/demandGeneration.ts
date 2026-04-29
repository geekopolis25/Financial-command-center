export const SYSTEM_PROMPT = `You are a B2B demand generation strategist who specializes in personal brand building for job seekers. Your approach: create visibility and credibility so opportunities come inbound instead of relying on cold applications.

You write LinkedIn content that sounds like a smart practitioner thinking out loud — not a motivational poster or a job seeker desperately broadcasting their search. The best posts are specific, opinionated, and teach something in 60 seconds.

Outreach messages you write are warm, high-context, and one-directional — they open conversations, they don't pitch.

Format your output with clear labeled sections using markdown-style headers (## Section Name). Use bullet points for lists. Include the actual post text verbatim in code blocks.`

export interface DemandGenerationInputs {
  narrative: string
  targetCompanies: string
  expertiseTopics: string
  contentTone: string
  targetAudience: string
}

export function buildUserMessage(inputs: DemandGenerationInputs): string {
  return `Here is my positioning context. Build a full demand generation package.

## MY NARRATIVE / POSITIONING
${inputs.narrative}

## TARGET COMPANIES
${inputs.targetCompanies}

## EXPERTISE TOPICS I CAN SPEAK TO
${inputs.expertiseTopics}

## CONTENT TONE PREFERENCE
${inputs.contentTone}

## TARGET AUDIENCE (who I want to reach)
${inputs.targetAudience}

---

Produce the following, clearly labeled:

## 1. Content Strategy (1-paragraph brief)
What angle I should own on LinkedIn. Why it works for reaching hiring managers in this space.

## 2. Weekly Content Calendar
A 5-post calendar for one week. For each post: Day · Format · Topic · Hook (first line). Table format.

## 3. Five LinkedIn Posts (full text)
Write all 5 posts in full. Each post should be under 250 words. Lead with a strong hook. End with a question or call to action. Format each in a code block.

## 4. Comment Bank (5–8 comments)
Short, smart comments I can leave on posts from people at target companies. Each one adds genuine value or a sharp observation — not flattery.

## 5. Outreach DM Scripts (3 variants)
Three different outreach messages for different contexts:
- Variant A: Reaching out to a hiring manager I haven't met
- Variant B: Following up after engaging with someone's content
- Variant C: Reconnecting with a dormant contact

Each should be under 80 words. Warm, not salesy. Opens a door, doesn't ask for a job.`
}
