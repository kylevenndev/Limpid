import { useRef } from 'react'
import './SceneBackground.css'
import { usePlayer } from '../../PlayerContext'

interface SceneBackgroundProps {
  src?: string
  alt?: string
}

function SceneBackground({
  src = '/scene-bg.jpg',
  alt = 'Isometric apartment interior',
}: SceneBackgroundProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const { moveTo } = usePlayer()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    moveTo({ x, y })
  }

  return (
    <div
      ref={sceneRef}
      className="scene-background"
      role="img"
      aria-label={alt}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${src}), radial-gradient(120% 120% at 50% 15%, #332a20 0%, #0c0b0a 75%)`,
      }}
    />
  )
}

export default SceneBackground
