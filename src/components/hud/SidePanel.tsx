import type { ReactNode } from 'react'
import './SidePanel.css'

interface RailButtonProps {
  label: string
  icon: ReactNode
  onClick?: () => void
}

function RailButton({ label, icon, onClick }: RailButtonProps) {
  return (
    <button type="button" className="hud-rail__item" onClick={onClick}>
      {icon}
      <span className="hud-rail__label">{label}</span>
    </button>
  )
}

function SidePanel() {
  return (
    <nav className="hud-rail" aria-label="Game menu">
      <RailButton
        label="Inventory"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="4" y1="9.5" x2="20" y2="9.5" />
          </svg>
        }
      />
      <RailButton
        label="Skills"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
          </svg>
        }
      />
      <RailButton
        label="Options"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <line x1="4" y1="6" x2="20" y2="6" />
            <circle cx="9" cy="6" r="2" fill="currentColor" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <circle cx="16" cy="12" r="2" fill="currentColor" />
            <line x1="4" y1="18" x2="20" y2="18" />
            <circle cx="11" cy="18" r="2" fill="currentColor" />
          </svg>
        }
      />
    </nav>
  )
}

export default SidePanel
