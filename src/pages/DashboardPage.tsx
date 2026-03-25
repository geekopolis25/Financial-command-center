import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import StatBox from '../components/StatBox'
import WaterfallRow from '../components/WaterfallRow'

export default function DashboardPage() {
  const { balance, budgetSegments, holdings } = useFinance()

  const totalBudget = budgetSegments.reduce((s, seg) => s + seg.amount, 0)
  const income = 4200
  const remainder = income - totalBudget
  const totalHoldings = holdings.filter(h => h.enabled).reduce((s, h) => s + h.value, 0)
  const netWorth = totalHoldings + balance

  const waterfallItems = [
    { label: 'Income', amount: income, color: 'var(--green)' },
    ...budgetSegments.map(s => ({ label: s.label, amount: -s.amount, color: s.color })),
    { label: 'Remainder', amount: remainder, color: remainder >= 0 ? 'var(--green)' : 'var(--red)' },
  ]
  const maxWf = Math.max(...waterfallItems.map(w => Math.abs(w.amount)))

  return (
    <div className="page active">
      <SectionHeader num="01" title="OVERVIEW" sub="monthly snapshot" />

      <div className="g4">
        <Card label="Monthly Income" value={`$${income.toLocaleString()}`} accent="tg" valueColor="cg" />
        <Card label="Total Budget" value={`$${totalBudget.toLocaleString()}`} accent="ta" valueColor="ca" />
        <Card
          label="Debt Balance"
          value={`${balance < 0 ? '-' : ''}$${Math.abs(balance).toLocaleString()}`}
          accent="tr"
          valueColor="cr"
        />
        <Card
          label="Net Worth"
          value={`${netWorth < 0 ? '-' : ''}$${Math.abs(netWorth).toLocaleString()}`}
          accent={netWorth >= 0 ? 'tg' : 'tr'}
          valueColor={netWorth >= 0 ? 'cg' : 'cr'}
        />
      </div>

      <SectionHeader num="02" title="KEY METRICS" />

      <div className="g5">
        <StatBox value={`${((totalBudget / income) * 100).toFixed(0)}%`} label="Budget Used" color="a" />
        <StatBox value={`$${remainder.toLocaleString()}`} label="Monthly Surplus" color={remainder >= 0 ? 'g' : 'r'} />
        <StatBox value={`$${totalHoldings.toLocaleString()}`} label="Holdings" color="g" />
        <StatBox
          value={balance !== 0 ? `${Math.ceil(Math.abs(balance) / 800)} mo` : '0 mo'}
          label="Debt Free ETA"
          color="a"
        />
        <StatBox
          value={`${((totalHoldings / Math.max(Math.abs(balance), 1)) * 100).toFixed(0)}%`}
          label="Asset/Debt Ratio"
          color={totalHoldings >= Math.abs(balance) ? 'g' : 'r'}
        />
      </div>

      <SectionHeader num="03" title="CASH WATERFALL" sub="where money flows" />

      <div className="card">
        {waterfallItems.map((item, i) => (
          <WaterfallRow
            key={i}
            label={item.label}
            amount={item.amount}
            maxAmount={maxWf}
            color={item.color}
          />
        ))}
      </div>
    </div>
  )
}
