import SceneBackground from '../scene/SceneBackground'
import SidePanel from './SidePanel'
import ClarityMeter from './ClarityMeter'
import Health from './Health'
import DialoguePanel from './DialoguePanel'
import { usePlayer } from '../../PlayerContext'
import { interactables } from '../../data/interactables'
import './Hud.css'

function Hud() {
  const { currentPassage, openInteractable } = usePlayer()

  return (
    <div className="hud">
      <SceneBackground />
      <div className="hud-overlay">
        <SidePanel />
        <ClarityMeter label="Clarity" value={44} />
        <Health />
        {!currentPassage &&
          interactables.map((interactable) => (
            <button
              key={interactable.id}
              type="button"
              className="hud-interactable"
              style={{ top: interactable.position.top, left: interactable.position.left }}
              onClick={() => openInteractable(interactable)}
            >
              {interactable.name}
            </button>
          ))}
        {currentPassage && <DialoguePanel passage={currentPassage} />}
      </div>
    </div>
  )
}

export default Hud
