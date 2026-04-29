import type { PageId } from '../types'

const pages: { id: PageId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'debt', label: 'Debt' },
  { id: 'budget', label: 'Budget' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'settings', label: 'Settings' },
  { id: 'agents', label: '⚡ Hiring Hub' },
]

interface Props {
  active: PageId
  onChange: (id: PageId) => void
}

export default function PageNav({ active, onChange }: Props) {
  return (
    <nav className="page-nav">
      {pages.map(p => (
        <button
          key={p.id}
          className={`pnav-btn ${active === p.id ? 'on' : ''}`}
          onClick={() => onChange(p.id)}
        >
          {p.label}
        </button>
      ))}
    </nav>
  )
}
