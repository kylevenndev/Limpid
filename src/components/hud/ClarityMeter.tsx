import './ClarityMeter.css'

interface ClarityMeterProps {
  label?: string
  value: number
  avatarSrc?: string
}

function ClarityMeter({ label = 'Clarity', value, avatarSrc }: ClarityMeterProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className="hud-orb">
      <div className="hud-orb__ring">
        <div className="hud-orb__fill" style={{ height: `${clamped}%` }} />
        {avatarSrc ? (
          <img className="hud-orb__avatar" src={avatarSrc} alt="" />
        ) : (
          <svg
            className="hud-orb__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
          </svg>
        )}
      </div>
      <div className="hud-orb__label">{label}</div>
    </div>
  )
}

export default ClarityMeter
