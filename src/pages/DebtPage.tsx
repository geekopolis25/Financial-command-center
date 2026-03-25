import { useFinance } from '../context/FinanceContext'
import Card from '../components/Card'
import SectionHeader from '../components/SectionHeader'
import StatBox from '../components/StatBox'

export default function DebtPage() {
  const { balance } = useFinance()
  const monthlyPayment = 800
  const apr = 22.9
  const monthlyRate = apr / 100 / 12
  const absBalance = Math.abs(balance)

  // Months to payoff (simplified)
  const monthsToPayoff = absBalance > 0
    ? Math.ceil(
        -Math.log(1 - (monthlyRate * absBalance) / monthlyPayment) / Math.log(1 + monthlyRate)
      )
    : 0
  const totalInterest = Math.max(0, monthlyPayment * monthsToPayoff - absBalance)

  return (
    <div className="page active">
      <SectionHeader num="01" title="DEBT OVERVIEW" sub="payoff tracker" />

      <div className="g4">
        <Card
          label="Outstanding"
          value={`-$${absBalance.toLocaleString()}`}
          accent="tr"
          valueColor="cr"
        />
        <Card label="APR" value={`${apr}%`} accent="tr" valueColor="cr" />
        <Card label="Monthly Payment" value={`$${monthlyPayment}`} accent="ta" valueColor="ca" />
        <Card
          label="Payoff Date"
          value={`${monthsToPayoff} mo`}
          accent="ta"
          valueColor="ca"
          sub={isFinite(monthsToPayoff) ? `~${(monthsToPayoff / 12).toFixed(1)} years` : 'N/A'}
        />
      </div>

      <SectionHeader num="02" title="PAYOFF STATS" />

      <div className="g4">
        <StatBox value={`$${totalInterest.toLocaleString()}`} label="Total Interest" color="r" />
        <StatBox value={`$${(monthlyPayment * monthsToPayoff).toLocaleString()}`} label="Total Cost" color="r" />
        <StatBox
          value={`$${(absBalance * monthlyRate).toFixed(0)}`}
          label="Monthly Interest"
          color="a"
        />
        <StatBox
          value={`$${Math.max(0, monthlyPayment - absBalance * monthlyRate).toFixed(0)}`}
          label="Monthly Principal"
          color="g"
        />
      </div>

      <SectionHeader num="03" title="PROGRESS" />

      <div className="card">
        <div style={{ marginBottom: 8 }}>
          <div className="card-lbl">Payoff Progress</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
            <div style={{
              flex: 1,
              height: 8,
              background: 'var(--surface2)',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              <div style={{
                width: '0%',
                height: '100%',
                background: 'var(--green)',
                borderRadius: 4,
                transition: 'width 0.5s',
              }} />
            </div>
            <span className="card-sub">0%</span>
          </div>
        </div>
        <div className="card-sub" style={{ marginTop: 8 }}>
          Track your debt payoff journey here. Update your balance in the header as you make payments.
        </div>
      </div>
    </div>
  )
}
