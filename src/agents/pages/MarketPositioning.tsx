import { useState } from 'react'
import { useClaudeStream } from '../hooks/useClaudeStream'
import { SYSTEM_PROMPT, buildUserMessage } from '../prompts/marketPositioning'
import { Field, TextArea, Input } from '../components/InputPanel'
import OutputPanel from '../components/OutputPanel'
import styles from '../agents.module.css'

export default function MarketPositioning() {
  const { output, isLoading, error, run, reset } = useClaudeStream()

  const [resume, setResume] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [targetCompany, setTargetCompany] = useState('')
  const [industry, setIndustry] = useState('')
  const [achievements, setAchievements] = useState('')

  function handleRun() {
    run(SYSTEM_PROMPT, buildUserMessage({ resume, targetRole, targetCompany, industry, achievements }))
  }

  return (
    <div className={styles.agentPage}>
      <div className={styles.agentHeader}>
        <div className={styles.agentNum}>01</div>
        <div className={styles.agentTitle}>Market Positioning Agent</div>
        <div className={styles.agentMission}>Resume · LinkedIn · Keywords · Narrative</div>
      </div>

      <div className={styles.split}>
        <div className={styles.inputCard}>
          <Field
            label="Resume / Experience"
            tip="Paste your full resume text or a summary of your experience. The more specific, the better the output."
          >
            <TextArea
              rows={8}
              placeholder="Paste resume text, work history, or bullet points..."
              value={resume}
              onChange={e => setResume(e.target.value)}
            />
          </Field>

          <div className={styles.sectionDivider}>Target</div>

          <Field label="Target Role" tip="The exact job title you're targeting. E.g. 'Director of Product' or 'Senior Software Engineer'">
            <Input
              placeholder="e.g. Head of Growth"
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
            />
          </Field>

          <Field label="Target Company / Companies" tip="Name one or a few companies you're targeting. Used to tailor keyword alignment.">
            <Input
              placeholder="e.g. Stripe, Figma, or Series B SaaS"
              value={targetCompany}
              onChange={e => setTargetCompany(e.target.value)}
            />
          </Field>

          <Field label="Industry" tip="The sector or domain you're targeting.">
            <Input
              placeholder="e.g. Fintech, EdTech, B2B SaaS"
              value={industry}
              onChange={e => setIndustry(e.target.value)}
            />
          </Field>

          <div className={styles.sectionDivider}>Achievements</div>

          <Field
            label="Top 3–5 Achievements (with metrics)"
            tip="The wins you're most proud of. Include numbers wherever possible: revenue, growth %, time saved, team size, ARR, etc."
          >
            <TextArea
              rows={5}
              placeholder="1. Grew MRR from $50K to $400K in 18 months&#10;2. Led a team of 12 engineers across 3 time zones&#10;3. ..."
              value={achievements}
              onChange={e => setAchievements(e.target.value)}
            />
          </Field>

          <button
            className={styles.runBtn}
            onClick={handleRun}
            disabled={isLoading || !resume.trim()}
          >
            {isLoading ? 'Running...' : 'Run Agent'}
          </button>
          {(output || error) && (
            <button className={styles.resetBtn} onClick={reset}>
              Reset
            </button>
          )}
        </div>

        <OutputPanel output={output} isLoading={isLoading} error={error} agentKey="market-positioning" />
      </div>
    </div>
  )
}
