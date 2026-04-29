import { useState, type FC } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { FinanceProvider } from './context/FinanceContext'
import Tooltip from './components/Tooltip'
import Header from './components/Header'
import CrisisBar from './components/CrisisBar'
import NutBar from './components/NutBar'
import HoldingsBar from './components/HoldingsBar'
import PageNav from './components/PageNav'
import DashboardPage from './pages/DashboardPage'
import DebtPage from './pages/DebtPage'
import BudgetPage from './pages/BudgetPage'
import ForecastPage from './pages/ForecastPage'
import SettingsPage from './pages/SettingsPage'
import AgentHub from './agents/AgentHub'
import type { PageId } from './types'

const FINANCE_PAGES = new Set<PageId>(['dashboard', 'debt', 'budget', 'forecast', 'settings'])

const pages: Record<Exclude<PageId, 'agents'>, FC> = {
  dashboard: DashboardPage,
  debt: DebtPage,
  budget: BudgetPage,
  forecast: ForecastPage,
  settings: SettingsPage,
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard')
  const isFinancePage = FINANCE_PAGES.has(activePage)

  return (
    <ThemeProvider>
      <FinanceProvider>
        <Tooltip />
        <Header />
        {isFinancePage && (
          <>
            <CrisisBar />
            <NutBar />
            <HoldingsBar />
          </>
        )}
        <PageNav active={activePage} onChange={setActivePage} />
        {activePage === 'agents'
          ? <AgentHub />
          : (() => { const P = pages[activePage as Exclude<PageId, 'agents'>]; return <P /> })()
        }
      </FinanceProvider>
    </ThemeProvider>
  )
}
