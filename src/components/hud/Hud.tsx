import SceneBackground from '../scene/SceneBackground'
import SidePanel from './SidePanel'
import ClarityMeter from './ClarityMeter'
import Health from './Health'
import DialoguePanel from './DialoguePanel'
import { usePlayer } from '../../PlayerContext'
import choppingBoardData from '../../data/choppingBoard.json'
import type { Interactable } from '../../types/interactable'
import './Hud.css'

const choppingBoard = choppingBoardData as Interactable

function Hud() {
  const { currentPassage, openInteractable } = usePlayer()

  return (
    <div className="hud">
      <SceneBackground />
      <div className="hud-overlay">
        <SidePanel />
        <ClarityMeter label="Clarity" value={44} />
        <Health />
        {!currentPassage && (
          <button type="button" onClick={() => openInteractable(choppingBoard)}>
            Interact with chopping board (test)
          </button>
        )}
        {currentPassage && <DialoguePanel passage={currentPassage} />}
      </div>
    </div>
  )
}

export default Hud
