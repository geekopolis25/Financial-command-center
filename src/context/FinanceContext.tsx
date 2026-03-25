import { createContext, useContext, useState, type ReactNode } from 'react'
import type { BudgetSegment, Holding } from '../types'

interface FinanceState {
  balance: number
  setBalance: (v: number) => void
  budgetSegments: BudgetSegment[]
  setBudgetSegments: (s: BudgetSegment[]) => void
  holdings: Holding[]
  setHoldings: (h: Holding[]) => void
  crisisMessage: string
  setCrisisMessage: (m: string) => void
}

const defaults: {
  balance: number
  budgetSegments: BudgetSegment[]
  holdings: Holding[]
  crisisMessage: string
} = {
  balance: -12450,
  crisisMessage: 'DEBT PAYOFF MODE — Every dollar above essentials attacks the balance.',
  budgetSegments: [
    { label: 'Rent', amount: 1650, color: 'var(--red)' },
    { label: 'Utils', amount: 280, color: 'var(--red-mid)' },
    { label: 'Food', amount: 450, color: 'var(--amber)' },
    { label: 'Transport', amount: 120, color: 'var(--amber-mid)' },
    { label: 'Insurance', amount: 200, color: 'var(--blue)' },
    { label: 'Debt Pay', amount: 800, color: 'var(--green)' },
    { label: 'Savings', amount: 200, color: 'var(--green-mid)' },
  ],
  holdings: [
    { name: 'Emergency Fund', ticker: 'HYSA', enabled: true, value: 3200 },
    { name: 'Index Fund', ticker: 'VTI', enabled: true, value: 4800 },
    { name: 'I-Bonds', ticker: 'IBOND', enabled: false, value: 1000, redemptionDate: '2026-11' },
  ],
}

const FinanceContext = createContext<FinanceState | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(defaults.balance)
  const [budgetSegments, setBudgetSegments] = useState(defaults.budgetSegments)
  const [holdings, setHoldings] = useState(defaults.holdings)
  const [crisisMessage, setCrisisMessage] = useState(defaults.crisisMessage)

  return (
    <FinanceContext.Provider
      value={{
        balance, setBalance,
        budgetSegments, setBudgetSegments,
        holdings, setHoldings,
        crisisMessage, setCrisisMessage,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider')
  return ctx
}
