import type { Position } from '../../types/player'
import './Player.css'

function Player({ position }: { position: Position }) {
  return (
    <div
      className="scene-player"
      style={{ top: `${position.y}%`, left: `${position.x}%` }}
    />
  )
}

export default Player
