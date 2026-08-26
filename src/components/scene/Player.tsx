import { usePosition } from '../../PositionContext'
import './Player.css'

function Player() {
  const { position } = usePosition()

  return (
    <div
      className="scene-player"
      style={{ top: `${position.y}%`, left: `${position.x}%` }}
    />
  )
}

export default Player
