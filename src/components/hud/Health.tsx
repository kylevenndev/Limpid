import { usePlayer } from '../../PlayerContext'
import './Health.css'

function Health() {
  const { health } = usePlayer()

  return (
    <div className="hud-health">
      <div className="hud-health__label">Health</div>
      <div className="hud-health__blocks">
        {Array.from({ length: health.max }, (_, i) => (
          <div
            key={i}
            className={`hud-health__block${i < health.current ? ' hud-health__block--filled' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Health
