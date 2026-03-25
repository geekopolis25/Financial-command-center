import type { ReactNode } from 'react'

interface Props {
  label: string
  value: string | ReactNode
  sub?: string
  accent?: string   // 'tr' | 'tg' | 'ta' | 'tb' | 'tn'
  valueColor?: string // 'cr' | 'cg' | 'ca' | 'cb'
  children?: ReactNode
}

export default function Card({ label, value, sub, accent, valueColor, children }: Props) {
  return (
    <div className={`card ${accent ?? ''}`}>
      <div className="card-lbl">{label}</div>
      <div className={`card-val ${valueColor ?? ''}`}>{value}</div>
      {sub && <div className="card-sub">{sub}</div>}
      {children}
    </div>
  )
}
