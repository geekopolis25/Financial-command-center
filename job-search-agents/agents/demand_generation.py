"""
Agent 2: Demand Generation
Reads Agent 1 outputs + target_roles.md.
Outputs: content calendar, LinkedIn posts, outreach scripts, target companies.
"""

from .base import (
    get_client,
    parse_sections,
    read_input,
    read_output,
    stream_and_collect,
    write_output,
)

_SYSTEM = """You are a B2B content strategist and outbound growth expert who has helped
hundreds of professionals build personal brands that generate inbound job opportunities.
You specialise in:

- Creating high-signal, platform-native content that builds authority (not noise)
- Turning lived experience into insights, stories, and POVs that resonate with decision-makers
- Designing warm outreach that feels like a genuine connection, not a cold pitch
- Mapping decision-makers at target companies and identifying the right entry points
- Engineering visibility loops that compound over 30-90 days

Your outputs are immediately actionable — copy-paste ready, not templates."""

_OUTPUT_INSTRUCTIONS = """
Using the positioning and career data above, produce all sections below.

===BEGIN 02_content_calendar.md===
## 4-Week LinkedIn Content Calendar

For each week provide a table:

| Day | Post Type | Topic/Hook | Goal |
|-----|-----------|------------|------|

Post types: Story, Insight, POV, Tactical How-To, Engagement Question, Case Study
Goals: Authority, Visibility, Network Growth, Recruiter Signal, Warm Leads

Include a brief weekly theme and 1-sentence strategic rationale per week.
===END 02_content_calendar.md===

===BEGIN 02_posts.md===
Write 12 ready-to-publish LinkedIn posts. Mix of types. Each post:

---
**Post N — [Type]: [Hook]**

[Full post text, 150-300 words, formatted with line breaks for readability.
No hashtag spam — max 3 targeted hashtags at end.]

*Strategic note: [1 sentence on why this post builds their positioning]*

---
===END 02_posts.md===

===BEGIN 02_outreach_scripts.md===
## Outreach Playbook

### Template 1: Recruiter Inbound (LinkedIn InMail)
[Subject line + 100-word message]

### Template 2: Warm Network Reconnect
[Subject line + 150-word message — someone they know but haven't spoken to in 2+ years]

### Template 3: Decision-Maker Cold Outreach (LinkedIn)
[Subject line + 120-word message — hiring manager or team lead, not HR]

### Template 4: Referral Ask
[Email + 100-word message — asking a mutual contact for an intro]

### Template 5: Post-Application Follow-Up
[Email + 80-word message — 5 days after applying with no response]

### Follow-Up Sequence (for Templates 2 & 3)
- Follow-up 1 (Day 5): [50 words]
- Follow-up 2 (Day 12): [40 words — final nudge, leaves door open]
===END 02_outreach_scripts.md===

===BEGIN 02_target_companies.md===
## Target Company List

Based on the target roles and positioning, identify 15-20 specific companies.
For each:

| Company | Why It's a Fit | Likely Role Title | Entry Point | Priority |
|---------|---------------|-------------------|-------------|----------|

After the table, write a **Contact-Finding Strategy** section:
1. How to find the right hiring manager on LinkedIn (search strings)
2. How to identify warm paths in (mutual connections, alumni, previous colleagues)
3. How to time outreach around company signals (funding, launches, job postings)
===END 02_target_companies.md===
"""


def run() -> None:
    print("\n=== Agent 2: Demand Generation ===")
    client = get_client()

    print("Reading inputs...")
    target_roles = read_input("target_roles.md")
    narrative = read_output("01_master_narrative.md")
    angles = read_output("01_positioning_angles.md")
    keyword_map = read_output("01_keyword_map.md")

    user_content = f"""## MASTER NARRATIVE (from Agent 1)
{narrative}

## POSITIONING ANGLES (from Agent 1)
{angles}

## KEYWORD MAP (from Agent 1)
{keyword_map}

## TARGET ROLES & INDUSTRIES
{target_roles}

---
{_OUTPUT_INSTRUCTIONS}"""

    print("Calling Claude (30-90 seconds)...\n")
    response = stream_and_collect(client, _SYSTEM, user_content)

    print("\nParsing outputs...")
    sections = parse_sections(response)
    expected = [
        "02_content_calendar.md",
        "02_posts.md",
        "02_outreach_scripts.md",
        "02_target_companies.md",
    ]
    for filename in expected:
        if filename in sections:
            write_output(filename, sections[filename])
        else:
            print(f"  WARNING: Could not parse section for {filename}")

    print("\nAgent 2 complete — 4 files written to outputs/")
