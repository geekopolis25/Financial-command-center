import { useFinance } from '../context/FinanceContext'
import SectionHeader from '../components/SectionHeader'
import StatBox from '../components/StatBox'

export default function BudgetPage() {
  const { budgetSegments, setBudgetSegments } = useFinance()
  const income = 4200
  const total = budgetSegments.reduce((s, seg) => s + seg.amount, 0)
  const remainder = income - total

  const updateAmount = (idx: number, val: string) => {
    const parsed = parseFloat(val.replace(/[^-\d.]/g, ''))
    if (isNaN(parsed)) return
    const next = [...budgetSegments]
    next[idx] = { ...next[idx]!, amount: parsed }
    setBudgetSegments(next)
  }

  return (
    <div className="page active">
      <SectionHeader num="01" title="BUDGET BREAKDOWN" sub="monthly allocation" />

      <div className="g3" style={{ marginBottom: 14 }}>
        <StatBox value={`$${income.toLocaleString()}`} label="Income" color="g" />
        <StatBox value={`$${total.toLocaleString()}`} label="Allocated" color="a" />
        <StatBox value={`$${remainder.toLocaleString()}`} label="Remainder" color={remainder >= 0 ? 'g' : 'r'} />
      </div>

      <SectionHeader num="02" title="LINE ITEMS" sub="click amounts to edit" />

      <div className="card">
        {budgetSegments.map((seg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 0',
              borderBottom: i < budgetSegments.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: seg.color,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, fontSize: 11 }}>{seg.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: 'var(--muted)', fontSize: 11 }}>$</span>
              <input
                className="ei"
                style={{ width: 80, marginTop: 0, textAlign: 'right' }}
                defaultValue={seg.amount}
                onBlur={e => updateAmount(i, e.target.value)}
              />
            </div>
            <div style={{ width: 60, textAlign: 'right', fontSize: 10, color: 'var(--muted)' }}>
              {((seg.amount / income) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
