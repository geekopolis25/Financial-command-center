import { useTheme } from '../context/ThemeContext'
import SectionHeader from '../components/SectionHeader'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="page active">
      <SectionHeader num="01" title="SETTINGS" sub="configuration" />

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, marginBottom: 2 }}>Theme</div>
            <div className="card-sub">Toggle between dark and light mode</div>
          </div>
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀ LIGHT' : '☾ DARK'}
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 11, marginBottom: 2 }}>Data Persistence</div>
          <div className="card-sub">
            Data is stored in-memory for this session. LocalStorage persistence coming soon.
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
          <div style={{ fontSize: 11, marginBottom: 2 }}>Version</div>
          <div className="card-sub">Geek CC v1.0.0</div>
        </div>
      </div>
    </div>
  )
}
