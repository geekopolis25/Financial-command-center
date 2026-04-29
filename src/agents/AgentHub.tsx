import { useState } from 'react'
import MarketPositioning from './pages/MarketPositioning'
import DemandGeneration from './pages/DemandGeneration'
import InterviewConversion from './pages/InterviewConversion'
import styles from './agents.module.css'

type AgentId = 'positioning' | 'demand' | 'interview'

const AGENTS: { id: AgentId; label: string }[] = [
  { id: 'positioning', label: '01 · Market Positioning' },
  { id: 'demand',      label: '02 · Demand Generation' },
  { id: 'interview',   label: '03 · Interview & Conversion' },
]

export default function AgentHub() {
  const [active, setActive] = useState<AgentId>('positioning')

  return (
    <div className={styles.agentHub}>
      <div className={styles.agentTabs}>
        {AGENTS.map(a => (
          <button
            key={a.id}
            className={`${styles.agentTab} ${active === a.id ? styles.active : ''}`}
            onClick={() => setActive(a.id)}
          >
            {a.label}
          </button>
        ))}
      </div>

      {active === 'positioning' && <MarketPositioning />}
      {active === 'demand'      && <DemandGeneration />}
      {active === 'interview'   && <InterviewConversion />}
    </div>
  )
}
