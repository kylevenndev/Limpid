import './SceneBackground.css'

interface SceneBackgroundProps {
  src?: string
  alt?: string
}

function SceneBackground({
  src = '/scene-bg.jpg',
  alt = 'Isometric apartment interior',
}: SceneBackgroundProps) {
  return (
    <div
      className="hud-scene"
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `url(${src}), radial-gradient(120% 120% at 50% 15%, #332a20 0%, #0c0b0a 75%)`,
      }}
    />
  )
}

export default SceneBackground
