import { useFinance } from '../context/FinanceContext'

export default function CrisisBar() {
  const { balance, crisisMessage } = useFinance()

  if (balance >= 0) return null

  return (
    <div className="crisis" style={{ background: 'var(--red-bg)', color: 'var(--red)' }}>
      <div className="crisis-dot" style={{ background: 'var(--red)' }} />
      {crisisMessage}
    </div>
  )
}
