export interface BudgetSegment {
  label: string
  amount: number
  color: string
  tip?: string
}

export interface Holding {
  name: string
  ticker: string
  enabled: boolean
  value: number
  redemptionDate?: string
}

export interface WaterfallItem {
  label: string
  amount: number
  color: 'red' | 'green' | 'amber' | 'blue' | 'muted'
}

export interface CardData {
  label: string
  value: string
  sub?: string
  accent?: 'tr' | 'tg' | 'ta' | 'tb' | 'tn'
  valueColor?: 'cr' | 'cg' | 'ca' | 'cb'
}

export type PageId = 'dashboard' | 'debt' | 'budget' | 'forecast' | 'settings' | 'agents'

export type Theme = 'dark' | 'light'
