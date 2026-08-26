import SceneBackground from './SceneBackground'
import Player from './Player'
import { usePlayer } from '../../PlayerContext'
import { interactables } from '../../data/interactables'
import { isNear, parsePercent } from '../../utils/position'
import './Scene.css'

const INTERACTION_RADIUS = 15 // percent-units the player must be within to interact

function Scene() {
  const { currentDialogue, position, openInteractable } = usePlayer()

  return (
    <>
      <SceneBackground />
      <div className="scene-overlay">
        {!currentDialogue && <Player />}
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
