import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useFinance } from '../context/FinanceContext'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { balance, setBalance } = useFinance()
  const [editing, setEditing] = useState(false)
  const [inputVal, setInputVal] = useState(String(balance))

  const fmt = (n: number) =>
    (n < 0 ? '-' : '') + '$' + Math.abs(n).toLocaleString()

  const commitBalance = () => {
    const parsed = parseFloat(inputVal.replace(/[^-\d.]/g, ''))
    if (!isNaN(parsed)) setBalance(parsed)
    setEditing(false)
  }

  return (
    <header>
      <div className="logo">
        GEEK <span>CC</span>
      </div>
      <div className="hdr-right">
        <div>
          <div className="hdr-bal-lbl">Balance</div>
          {editing ? (
            <input
              className="hdr-bal-input"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onBlur={commitBalance}
              onKeyDown={e => e.key === 'Enter' && commitBalance()}
              autoFocus
            />
          ) : (
            <div
              className={`hdr-bal-val ${balance >= 0 ? 'pos' : 'neg'}`}
              onClick={() => { setInputVal(String(balance)); setEditing(true) }}
              style={{ cursor: 'pointer' }}
            >
              {fmt(balance)}
            </div>
          )}
        </div>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '☀ LIGHT' : '☾ DARK'}
        </button>
      </div>
    </header>
  )
}
