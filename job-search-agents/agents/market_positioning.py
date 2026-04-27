"""
Agent 1: Market Positioning
Reads resume, LinkedIn, target roles, and achievements.
Outputs: master narrative, positioning angles, resume variants, LinkedIn rewrite, keyword map.
"""

from .base import (
    get_client,
    parse_sections,
    read_input,
    read_input_optional,
    stream_and_collect,
    write_output,
)

_SYSTEM = """You are a world-class career positioning strategist and executive recruiter with 20+ years placing professionals at top companies. You specialise in:

- Extracting the strongest career narratives from raw experience
- Identifying 2-3 differentiated market positioning angles backed by actual demand
- Translating experience into measurable, recruiter-readable outcomes (metrics first)
- Aligning language with how recruiters actually search (ATS keywords, job titles, skills)
- Eliminating filler to reveal the signal

Your outputs are always concrete, specific, and immediately usable — never generic.
A recruiter should understand the candidate's value in under 10 seconds."""

_OUTPUT_INSTRUCTIONS = """
Analyse the career data above and produce every section below, formatted exactly between its markers.

===BEGIN 01_master_narrative.md===
Write a 1-2 paragraph master narrative: a punchy "who you are" statement a recruiter
understands in under 10 seconds. Strong verbs, lead with the most differentiated element,
zero filler. Include a one-line tagline at the top.
===END 01_master_narrative.md===

===BEGIN 01_positioning_angles.md===
Identify 2-3 distinct positioning angles based on the candidate's background and targets.
For each angle provide:
- **Angle name** (concise label)
- **Target audience** (company type / role type)
- **Core value proposition** (1 sentence)
- **Key proof points** from their background (3-5 bullets)
- **Market demand rationale** (why this angle is hot right now)
===END 01_positioning_angles.md===

===BEGIN 01_resume_variants.md===
Write 2-3 tailored resume variants. For each variant:

### Variant N: [Target Role Type]

**Header:** Name | Target Title | Location | Email | LinkedIn | GitHub (if relevant)
**Metrics Headline:** 3-5 word phrase capturing biggest quantified impact

**Summary (3 bullets, metrics-first):**
- ...

**Experience (2-3 most relevant roles, 3-4 bullets each, STAR + metrics):**
...

**Skills (ATS-aligned, comma-separated, grouped by category):**
...

---
===END 01_resume_variants.md===

===BEGIN 01_linkedin_rewrite.md===
Provide a fully rewritten LinkedIn profile:

## Headline
(120 chars max — keyword-rich, differentiated, not just a job title)

## About
(1st person, 3-4 paragraphs: hook → expertise/proof → what you're building toward → CTA)

## Experience
For each role (most recent first):
**Title | Company | Dates**
- 3-4 metrics-first bullet points

## Skills
Top 20 ranked by recruiter search relevance (comma-separated)

## Featured Section
Recommend 3-5 pieces of content to pin (articles, projects, posts)
===END 01_linkedin_rewrite.md===

===BEGIN 01_keyword_map.md===
| Keyword/Phrase | Evidence in Background | ATS Weight |
|---|---|---|
(25-30 rows covering job titles, technical skills, methodologies, tools, soft skills,
credentials/certifications — mark High/Medium/Low ATS weight)
===END 01_keyword_map.md===
"""


def run() -> None:
    print("\n=== Agent 1: Market Positioning ===")
    client = get_client()

    print("Reading inputs...")
    resume = read_input("resume.md")
    linkedin = read_input("linkedin.md")
    target_roles = read_input("target_roles.md")
    achievements = read_input_optional("achievements.md")

    user_content = f"""## RESUME
{resume}

## LINKEDIN PROFILE (CURRENT)
{linkedin}

## TARGET ROLES & INDUSTRIES
{target_roles}
"""
    if achievements:
        user_content += f"\n## ADDITIONAL ACHIEVEMENTS & CONTEXT\n{achievements}\n"

    user_content += f"\n---\n{_OUTPUT_INSTRUCTIONS}"

    print("Calling Claude (30-90 seconds)...\n")
    response = stream_and_collect(client, _SYSTEM, user_content)

    print("\nParsing outputs...")
    sections = parse_sections(response)
    expected = [
        "01_master_narrative.md",
        "01_positioning_angles.md",
        "01_resume_variants.md",
        "01_linkedin_rewrite.md",
        "01_keyword_map.md",
    ]
    for filename in expected:
        if filename in sections:
            write_output(filename, sections[filename])
        else:
            print(f"  WARNING: Could not parse section for {filename}")

    print("\nAgent 1 complete — 5 files written to outputs/")
