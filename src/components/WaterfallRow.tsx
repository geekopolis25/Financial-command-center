interface Props {
  label: string
  amount: number
  maxAmount: number
  color: string // CSS color variable value
}

export default function WaterfallRow({ label, amount, maxAmount, color }: Props) {
  const pct = maxAmount > 0 ? Math.min((Math.abs(amount) / maxAmount) * 100, 100) : 0
  const isNeg = amount < 0
  const fmt = (isNeg ? '-' : '') + '$' + Math.abs(amount).toLocaleString()

  return (
    <div className="wf-row">
      <div className="wf-lbl">{label}</div>
      <div className="wf-bw">
        <div className="wf-b" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className={`wf-amt ${isNeg ? 'neg' : 'pos'}`}>{fmt}</div>
    </div>
  )
}
