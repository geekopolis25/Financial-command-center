import { useState } from 'react'
import { useClaudeStream } from '../hooks/useClaudeStream'
import { SYSTEM_PROMPT, buildUserMessage } from '../prompts/interviewConversion'
import { Field, TextArea, Input, Select } from '../components/InputPanel'
import OutputPanel from '../components/OutputPanel'
import styles from '../agents.module.css'

const INTERVIEW_TYPE_OPTIONS = [
  { value: 'behavioral', label: 'Behavioral — competency & STAR questions' },
  { value: 'case', label: 'Case / Strategy — problem-solving scenarios' },
  { value: 'technical', label: 'Technical — system design or domain expertise' },
  { value: 'executive', label: 'Executive — leadership vision & org dynamics' },
  { value: 'general', label: 'General — first round / recruiter screen' },
]

export default function InterviewConversion() {
  const { output, isLoading, error, run, reset } = useClaudeStream()

  const [jobDescription, setJobDescription] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [background, setBackground] = useState('')
  const [interviewType, setInterviewType] = useState('behavioral')
  const [specificConcern, setSpecificConcern] = useState('')

  function handleRun() {
    run(SYSTEM_PROMPT, buildUserMessage({ jobDescription, companyName, background, interviewType, specificConcern }))
  }

  return (
    <div className={styles.agentPage}>
      <div className={styles.agentHeader}>
        <div className={styles.agentNum}>03</div>
        <div className={styles.agentTitle}>Interview &amp; Conversion Agent</div>
        <div className={styles.agentMission}>Prep · Story Bank · Negotiation · Follow-Up</div>
      </div>

      <div className={styles.split}>
        <div className={styles.inputCard}>
          <Field
            label="Job Description"
            tip="Paste the full job description. The agent will extract what they're really hiring for and build your prep around it."
          >
            <TextArea
              rows={8}
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
            />
          </Field>

          <div className={styles.sectionDivider}>Context</div>

          <Field label="Company Name" tip="The company you're interviewing at. Used to tailor culture-fit questions and research angles.">
            <Input
              placeholder="e.g. Stripe"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
            />
          </Field>

          <Field
            label="Your Background"
            tip="Paste a summary of your experience relevant to this role, or key bullet points from your resume."
          >
            <TextArea
              rows={5}
              placeholder="Summarize your relevant experience, key wins, and background for this role..."
              value={background}
              onChange={e => setBackground(e.target.value)}
            />
          </Field>

          <div className={styles.sectionDivider}>Format</div>

          <Field
            label="Interview Type"
            tip="Select the format of the interview you're preparing for. This shapes which questions and frameworks the agent emphasizes."
          >
            <Select
              options={INTERVIEW_TYPE_OPTIONS}
              value={interviewType}
              onChange={e => setInterviewType(e.target.value)}
            />
          </Field>

          <Field
            label="Specific Concern or Focus Area"
            tip="Is there a gap in your background, a tough question you dread, or a specific part of the role you're unsure about? Tell the agent."
          >
            <TextArea
              rows={3}
              placeholder="e.g. I have no direct experience managing a team of 20+, but this role requires it. How do I address that?"
              value={specificConcern}
              onChange={e => setSpecificConcern(e.target.value)}
            />
          </Field>

          <button
            className={styles.runBtn}
            onClick={handleRun}
            disabled={isLoading || !jobDescription.trim()}
          >
            {isLoading ? 'Running...' : 'Run Agent'}
          </button>
          {(output || error) && (
            <button className={styles.resetBtn} onClick={reset}>
              Reset
            </button>
          )}
        </div>

        <OutputPanel output={output} isLoading={isLoading} error={error} agentKey="interview-conversion" />
      </div>
    </div>
  )
}
