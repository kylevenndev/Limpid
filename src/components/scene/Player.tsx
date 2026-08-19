import { usePlayer } from '../../PlayerContext'
import './Player.css'

function Player() {
  const { position } = usePlayer()

  return (
    <div
      className="scene-player"
      style={{ top: `${position.y}%`, left: `${position.x}%` }}
    />
  )
}

export default Player
