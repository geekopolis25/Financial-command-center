import { useState } from 'react'
import { useClaudeStream } from '../hooks/useClaudeStream'
import { SYSTEM_PROMPT, buildUserMessage } from '../prompts/demandGeneration'
import { Field, TextArea, Input, Select } from '../components/InputPanel'
import OutputPanel from '../components/OutputPanel'
import styles from '../agents.module.css'

const TONE_OPTIONS = [
  { value: 'educational', label: 'Educational — teach something useful' },
  { value: 'story', label: 'Story — personal narrative / lesson learned' },
  { value: 'opinion', label: 'Opinion — bold take or contrarian view' },
  { value: 'tactical', label: 'Tactical — frameworks and how-tos' },
]

export default function DemandGeneration() {
  const { output, isLoading, error, run, reset } = useClaudeStream()

  const [narrative, setNarrative] = useState('')
  const [targetCompanies, setTargetCompanies] = useState('')
  const [expertiseTopics, setExpertiseTopics] = useState('')
  const [contentTone, setContentTone] = useState('educational')
  const [targetAudience, setTargetAudience] = useState('')

  function handleRun() {
    run(SYSTEM_PROMPT, buildUserMessage({ narrative, targetCompanies, expertiseTopics, contentTone, targetAudience }))
  }

  return (
    <div className={styles.agentPage}>
      <div className={styles.agentHeader}>
        <div className={styles.agentNum}>02</div>
        <div className={styles.agentTitle}>Demand Generation Agent</div>
        <div className={styles.agentMission}>Content · Outreach · Network · Visibility</div>
      </div>

      <div className={styles.split}>
        <div className={styles.inputCard}>
          <Field
            label="Your Narrative / Positioning"
            tip="Paste your master narrative from Agent 01, or summarize who you are and what you do in 2–3 sentences."
          >
            <TextArea
              rows={5}
              placeholder="Paste output from Market Positioning Agent, or write: 'I am a [role] who helps [audience] do [outcome]...'"
              value={narrative}
              onChange={e => setNarrative(e.target.value)}
            />
          </Field>

          <div className={styles.sectionDivider}>Targets</div>

          <Field
            label="Target Companies"
            tip="Companies where you want to build visibility. List 3–5. These inform outreach scripts and content angles."
          >
            <Input
              placeholder="e.g. Notion, Linear, Loom, Vercel"
              value={targetCompanies}
              onChange={e => setTargetCompanies(e.target.value)}
            />
          </Field>

          <Field
            label="Target Audience"
            tip="Who do you want to reach? Hiring managers at Series B startups? CTOs at mid-market SaaS companies?"
          >
            <Input
              placeholder="e.g. Hiring managers at growth-stage B2B SaaS"
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
            />
          </Field>

          <div className={styles.sectionDivider}>Content</div>

          <Field
            label="Expertise Topics"
            tip="What can you speak to with authority? List 3–5 topics. These become your content pillars."
          >
            <TextArea
              rows={4}
              placeholder="e.g. go-to-market strategy, hiring senior engineers, building in public, pricing SaaS products..."
              value={expertiseTopics}
              onChange={e => setExpertiseTopics(e.target.value)}
            />
          </Field>

          <Field
            label="Content Tone"
            tip="The style of posts you want to publish. Pick what feels most natural for you."
          >
            <Select
              options={TONE_OPTIONS}
              value={contentTone}
              onChange={e => setContentTone(e.target.value)}
            />
          </Field>

          <button
            className={styles.runBtn}
            onClick={handleRun}
            disabled={isLoading || !narrative.trim()}
          >
            {isLoading ? 'Running...' : 'Run Agent'}
          </button>
          {(output || error) && (
            <button className={styles.resetBtn} onClick={reset}>
              Reset
            </button>
          )}
        </div>

        <OutputPanel output={output} isLoading={isLoading} error={error} agentKey="demand-generation" />
      </div>
    </div>
  )
}
