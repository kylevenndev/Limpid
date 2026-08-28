import SceneBackground from './SceneBackground'
import Player from './Player'
import { usePlayer } from '../../PlayerContext'
import { usePlayerPosition } from '../../hooks/usePlayerPosition'
import { interactables } from '../../data/interactables'
import { isNear, parsePercent } from '../../utils/position'
import './Scene.css'

const INTERACTION_RADIUS = 15 // percent-units the player must be within to interact

function Scene() {
  const { currentDialogue, openInteractable } = usePlayer()
  const { position, moveTo } = usePlayerPosition()

  return (
    <>
      <SceneBackground moveTo={moveTo} />
      <div className="scene-overlay">
        {!currentDialogue && <Player position={position} />}
        {!currentDialogue &&
          interactables.map((interactable) => {
            const interactablePosition = {
              x: parsePercent(interactable.position.left),
              y: parsePercent(interactable.position.top),
            }
            const near = isNear(position, interactablePosition, INTERACTION_RADIUS)

            return (
              <button
                key={interactable.id}
                type="button"
                className={`scene-interactable${near ? '' : ' scene-interactable--locked'}`}
                style={{ top: interactable.position.top, left: interactable.position.left }}
                onClick={() => openInteractable(interactable)}
                disabled={!near}
              >
                {interactable.name}
              </button>
            )
          })}
      </div>
    </>
  )
}

export default Scene
