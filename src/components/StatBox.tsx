interface Props {
  value: string
  label: string
  color?: 'g' | 'r' | 'a'
}

export default function StatBox({ value, label, color }: Props) {
  return (
    <div className="stat-box">
      <div className={`stat-val ${color ?? ''}`}>{value}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  )
}
