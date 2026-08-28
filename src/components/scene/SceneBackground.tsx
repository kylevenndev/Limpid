import { useRef } from 'react'
import './SceneBackground.css'
import { usePlayer } from '../../PlayerContext'
import type { Position } from '../../types/player'
import backgroundImage from '../../assets/scene-bg.jpg'

const BACKGROUND_ALT = 'Isometric apartment interior'

function SceneBackground({ moveTo }: { moveTo: (target: Position) => void }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const { currentDialogue } = usePlayer()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    if (!currentDialogue) {
      moveTo({ x, y })
    }
  }

  return (
    <div
      ref={sceneRef}
      className="scene-background"
      role="img"
      aria-label={BACKGROUND_ALT}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${backgroundImage}), radial-gradient(120% 120% at 50% 15%, #332a20 0%, #0c0b0a 75%)`,
      }}
    />
  )
}

export default SceneBackground
