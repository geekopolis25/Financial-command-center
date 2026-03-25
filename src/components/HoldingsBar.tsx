import { useFinance } from '../context/FinanceContext'

export default function HoldingsBar() {
  const { holdings, setHoldings } = useFinance()
  const total = holdings.filter(h => h.enabled).reduce((s, h) => s + h.value, 0)

  const toggleHolding = (idx: number) => {
    const next = [...holdings]
    next[idx] = { ...next[idx]!, enabled: !next[idx]!.enabled }
    setHoldings(next)
  }

  const updateValue = (idx: number, val: string) => {
    const parsed = parseFloat(val.replace(/[^-\d.]/g, ''))
    if (isNaN(parsed)) return
    const next = [...holdings]
    next[idx] = { ...next[idx]!, value: parsed }
    setHoldings(next)
  }

  return (
    <div className="hol-bar">
      <div className="hol-title">HOLDINGS</div>
      {holdings.map((h, i) => (
        <div className="hg" key={i}>
          <label className="toggle">
            <input
              type="checkbox"
              checked={h.enabled}
              onChange={() => toggleHolding(i)}
            />
            <span className="tsl" />
          </label>
          <span className="hg-lbl">
            {h.name} <small>{h.ticker}</small>
          </span>
          <div className="hg-red">
            $
            <input
              defaultValue={h.value}
              onBlur={e => updateValue(i, e.target.value)}
            />
          </div>
          <span className="hg-save">
            ${h.value.toLocaleString()}
          </span>
        </div>
      ))}
      <div className="hol-total">
        <div className="hol-total-lbl">Total Active</div>
        <div className="hol-total-val">${total.toLocaleString()}</div>
      </div>
    </div>
  )
}
