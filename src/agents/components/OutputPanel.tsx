import { useEffect, useRef, useCallback } from 'react'
import styles from '../agents.module.css'

interface Props {
  output: string
  isLoading: boolean
  error: string | null
  agentKey: string
}

const STORAGE_PREFIX = 'agent_output_'

export default function OutputPanel({ output, isLoading, error, agentKey }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoading && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [output, isLoading])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output)
  }, [output])

  const handleSave = useCallback(() => {
    localStorage.setItem(STORAGE_PREFIX + agentKey, output)
  }, [output, agentKey])

  const handleLoad = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + agentKey)
    return saved ?? null
  }, [agentKey])

  const saved = handleLoad()

  if (error) {
    return (
      <div className={styles.outputError}>
        <div className={styles.errorTitle}>Error</div>
        <div className={styles.errorMsg}>{error}</div>
      </div>
    )
  }

  if (!output && !isLoading) {
    return (
      <div className={styles.outputEmpty}>
        {saved ? (
          <div className={styles.savedNotice}>
            <span style={{ color: 'var(--muted)' }}>Last saved output available — run agent to refresh.</span>
            <pre className={styles.outputText}>{saved}</pre>
          </div>
        ) : (
          <div className={styles.emptyHint}>
            Fill in the inputs and click <strong>Run Agent</strong> to generate output.
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.outputWrap}>
      <div className={styles.outputToolbar}>
        <span className={styles.outputLabel}>
          {isLoading ? (
            <span className={styles.streaming}>Generating<span className={styles.cursor}>▌</span></span>
          ) : (
            'Output'
          )}
        </span>
        {output && !isLoading && (
          <div className={styles.outputActions}>
            <button className={styles.actionBtn} onClick={handleSave}>Save</button>
            <button className={styles.actionBtn} onClick={handleCopy}>Copy</button>
          </div>
        )}
      </div>
      <pre className={styles.outputText}>{output}</pre>
      <div ref={bottomRef} />
    </div>
  )
}
