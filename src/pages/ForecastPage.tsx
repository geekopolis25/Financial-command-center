import { useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'

export default function ForecastPage() {
  const { balance, budgetSegments, holdings } = useFinance()

  const income = 4200
  const totalBudget = budgetSegments.reduce((s, seg) => s + seg.amount, 0)
  const surplus = income - totalBudget
  const debtPayment = budgetSegments.find(s => s.label === 'Debt Pay')?.amount ?? 0
  const savingsRate = budgetSegments.find(s => s.label === 'Savings')?.amount ?? 0
  const totalHoldings = holdings.filter(h => h.enabled).reduce((s, h) => s + h.value, 0)

  const forecast = useMemo(() => {
    const months: { month: number; debt: number; holdings: number; netWorth: number }[] = []
    let debt = balance
    let hld = totalHoldings
    for (let m = 0; m <= 24; m++) {
      const nw = hld + debt
      months.push({ month: m, debt, holdings: hld, netWorth: nw })
      debt = Math.min(0, debt + debtPayment)
      hld += savingsRate
    }
    return months
  }, [balance, totalHoldings, debtPayment, savingsRate])

  const debtFreeMonth = forecast.find(f => f.debt >= 0)?.month ?? null

  return (
    <div className="page active">
      <SectionHeader num="01" title="24-MONTH FORECAST" sub="projected trajectory" />

      <div className="g3">
        <Card
          label="Debt Free In"
          value={debtFreeMonth !== null ? `${debtFreeMonth} mo` : 'N/A'}
          accent="tg"
          valueColor="cg"
        />
        <Card
          label="Projected Holdings (24mo)"
          value={`$${forecast[24]!.holdings.toLocaleString()}`}
          accent="tg"
          valueColor="cg"
        />
        <Card
          label="Projected Net Worth (24mo)"
          value={`${forecast[24]!.netWorth < 0 ? '-' : ''}$${Math.abs(forecast[24]!.netWorth).toLocaleString()}`}
          accent={forecast[24]!.netWorth >= 0 ? 'tg' : 'tr'}
          valueColor={forecast[24]!.netWorth >= 0 ? 'cg' : 'cr'}
        />
      </div>

      <SectionHeader num="02" title="MONTH-BY-MONTH" sub="scroll to explore" />

      <div className="card" style={{ maxHeight: 400, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
              <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--muted)', fontWeight: 500 }}>Month</th>
              <th style={{ padding: '6px 8px', color: 'var(--muted)', fontWeight: 500 }}>Debt</th>
              <th style={{ padding: '6px 8px', color: 'var(--muted)', fontWeight: 500 }}>Holdings</th>
              <th style={{ padding: '6px 8px', color: 'var(--muted)', fontWeight: 500 }}>Net Worth</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map(f => (
              <tr key={f.month} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '6px 8px' }}>Mo {f.month}</td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }} className={f.debt < 0 ? 'neg' : 'pos'}>
                  {f.debt < 0 ? '-' : ''}${Math.abs(f.debt).toLocaleString()}
                </td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }} className="pos">
                  ${f.holdings.toLocaleString()}
                </td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }} className={f.netWorth < 0 ? 'neg' : 'pos'}>
                  {f.netWorth < 0 ? '-' : ''}${Math.abs(f.netWorth).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-sub" style={{ marginTop: 4 }}>
        Monthly surplus: ${surplus.toLocaleString()} | Debt payment: ${debtPayment.toLocaleString()} | Savings: ${savingsRate.toLocaleString()}
      </div>
    </div>
  )
}
