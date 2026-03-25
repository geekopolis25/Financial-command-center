import { useFinance } from '../context/FinanceContext'

export default function NutBar() {
  const { budgetSegments } = useFinance()
  const total = budgetSegments.reduce((s, seg) => s + seg.amount, 0)
  const income = 4200 // placeholder monthly income

  const remainder = income - total
  const isNeg = remainder < 0

  return (
    <div className="nut-bar">
      <div className="nut-label">THE NUT</div>
      <div className="nut-segs">
        {budgetSegments.map((seg, i) => (
          <div
            key={i}
            className="nut-seg"
            style={{
              flex: seg.amount / total,
              background: seg.color,
            }}
            data-tip={`${seg.label}: $${seg.amount.toLocaleString()}`}
          >
            {seg.amount / total > 0.08 ? seg.label : ''}
          </div>
        ))}
      </div>
      <div className="nut-result">
        <div className="nut-res-lbl">Remainder</div>
        <div className={`nut-res-val ${isNeg ? 'neg' : 'pos'}`}>
          {isNeg ? '-' : ''}${Math.abs(remainder).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
