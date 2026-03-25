import { useState } from 'react'
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
import type { PageId } from './types'

const pages: Record<PageId, () => JSX.Element> = {
  dashboard: DashboardPage,
  debt: DebtPage,
  budget: BudgetPage,
  forecast: ForecastPage,
  settings: SettingsPage,
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard')
  const ActivePage = pages[activePage]

  return (
    <ThemeProvider>
      <FinanceProvider>
        <Tooltip />
        <Header />
        <CrisisBar />
        <NutBar />
        <HoldingsBar />
        <PageNav active={activePage} onChange={setActivePage} />
        <ActivePage />
      </FinanceProvider>
    </ThemeProvider>
  )
}
