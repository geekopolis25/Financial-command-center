"""
Agent 3: Interview & Conversion
Reads job_descriptions.md + Agent 1 outputs.
Outputs: story bank, interview prep, negotiation scripts, follow-up templates.
"""

from .base import (
    get_client,
    parse_sections,
    read_input,
    read_output,
    stream_and_collect,
    write_output,
)

_SYSTEM = """You are a senior interview coach and compensation negotiation strategist
who has helped 500+ professionals land offers at FAANG, top startups, and Fortune 500s.
You specialise in:

- Building repeatable story systems from raw experience (STAR+, not generic)
- Designing interview answers that are structured, confident, and memorable
- Teaching candidates to steer interviews instead of just responding
- Developing negotiation strategies that increase offer values by 15-40%
- Identifying and closing weak spots before they cost candidates offers

Your outputs are immediately rehearsable — not coaching theory, but actual scripts
and frameworks the candidate can use in their next interview."""

_OUTPUT_INSTRUCTIONS = """
Using the career data, positioning, and job descriptions above, produce all sections below.

===BEGIN 03_story_bank.md===
## Core Story Bank

Build 12-15 STAR+ stories mapped to competency categories.
STAR+ = Situation → Task → Action (specific, your role only) → Result (quantified) → Lesson/Pivot

Format each story:

---
### Story N: [Title]
**Competencies:** [list 2-3: e.g. Leadership, Ambiguity, Cross-functional Influence]
**Best for:** [question types this answers]

**S (Situation):** [2-3 sentences of crisp context]
**T (Task):** [your specific responsibility]
**A (Action):** [3-5 bullets, your actions only — use "I", not "we"]
**R (Result):** [quantified outcome + business impact]
**L (Lesson):** [1 sentence — shows self-awareness and growth]

**30-second version:** [tight verbal summary for time-pressured answers]

---
===END 03_story_bank.md===

===BEGIN 03_interview_prep.md===
## Role-Specific Interview Preparation

For each job description provided, create a preparation guide:

### [Role/Company from JD]

**Company Research Priorities:**
- 3-5 key things to research before the interview

**Likely Question Types & Recommended Stories:**
| Question Category | Likely Questions | Recommended Stories | Angle |
|---|---|---|---|

**Technical/Functional Deep-Dives** (if applicable):
- List topics likely to be probed and how to frame your experience

**Questions to Ask Them** (5 high-signal questions):
1. ...

**Red Flags to Watch For:**
- 2-3 signs this role might not be the right fit

---

## Mock Interview: Hard Questions

Write 8 genuinely tough questions with model answers (based on the candidate's actual background):

**Q: [Question]**
*Why they ask this:* [1 sentence]
*Model Answer:* [150-250 words, draws on story bank]

---
===END 03_interview_prep.md===

===BEGIN 03_negotiation_scripts.md===
## Compensation Negotiation Playbook

### Step 1: Before the Offer
**When they ask your salary expectations:**
> "[verbatim script — deflects and gathers info]"

**How to research market rate:**
- 3-4 specific sources and search strategies for this role/level

### Step 2: The Verbal Offer
**When they extend verbally:**
> "[verbatim script — expresses enthusiasm, buys time]"

### Step 3: Counter-Offer
**Written counter-offer email:**
> Subject: [Subject line]
> [Full email, 200 words, professional and confident tone]

**Key negotiation levers beyond base salary:**
- Equity/RSUs
- Sign-on bonus
- Remote work / flexibility
- Title / level
- Start date (reverse: earlier start as leverage)

### Step 4: Handling Common Pushback

**"That's above our band."**
> "[Response script]"

**"We can't move on base, but we can on equity."**
> "[Response script]"

**"We need your answer by tomorrow."**
> "[Response script — creates space without burning the offer]"

**"This is our best and final offer."**
> "[Response script]"

### Step 5: Competing Offers
**How to use a competing offer ethically:**
> "[Script for disclosure + leverage without ultimatums]"

### Decision Framework
A simple scoring matrix to evaluate the offer beyond compensation.
===END 03_negotiation_scripts.md===

===BEGIN 03_follow_ups.md===
## Follow-Up & Communication Templates

### Post-Interview Thank You (same day, within 2 hours)
**To: Hiring Manager**
> Subject: [Subject]
> [150-word email — references specific conversation moment, reinforces fit]

**To: Each Interviewer (panel round)**
> [Template with [PERSONALIZATION SLOT] — 100 words, specific to their role]

### Post-Interview Follow-Up (Day 5 — no response)
> Subject: [Subject]
> [80 words — polite, adds a value-add, doesn't beg]

### Requesting Feedback After Rejection
> Subject: [Subject]
> [100 words — gracious, specific ask, leaves door open]

### Withdrawing from a Process (accepted another offer)
> Subject: [Subject]
> [75 words — professional, preserves relationship]

### Reconnecting with a Stalled Process (2+ weeks silence)
> Subject: [Subject]
> [80 words — re-engages without desperation]
===END 03_follow_ups.md===
"""


def run() -> None:
    print("\n=== Agent 3: Interview & Conversion ===")
    client = get_client()

    print("Reading inputs...")
    job_descriptions = read_input("job_descriptions.md")
    narrative = read_output("01_master_narrative.md")
    angles = read_output("01_positioning_angles.md")

    user_content = f"""## MASTER NARRATIVE (from Agent 1)
{narrative}

## POSITIONING ANGLES (from Agent 1)
{angles}

## JOB DESCRIPTIONS
{job_descriptions}

---
{_OUTPUT_INSTRUCTIONS}"""

    print("Calling Claude (30-90 seconds)...\n")
    response = stream_and_collect(client, _SYSTEM, user_content)

    print("\nParsing outputs...")
    sections = parse_sections(response)
    expected = [
        "03_story_bank.md",
        "03_interview_prep.md",
        "03_negotiation_scripts.md",
        "03_follow_ups.md",
    ]
    for filename in expected:
        if filename in sections:
            write_output(filename, sections[filename])
        else:
            print(f"  WARNING: Could not parse section for {filename}")

    print("\nAgent 3 complete — 4 files written to outputs/")
