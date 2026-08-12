import './Health.css'

interface HealthProps {
  current: number
  max?: number
}

function Health({ current, max = 5 }: HealthProps) {
  return (
    <div className="hud-health">
      <div className="hud-health__label">Health</div>
      <div className="hud-health__blocks">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={`hud-health__block${i < current ? ' hud-health__block--filled' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Health
