import Scene from '../scene/Scene'
import SidePanel from './SidePanel'
import ClarityMeter from './ClarityMeter'
import Health from './Health'
import DialoguePanel from './DialoguePanel'
import { usePlayer } from '../../PlayerContext'
import './Hud.css'

function Hud() {
  const { currentDialogue } = usePlayer()

  return (
    <div className="hud">
      <Scene />
      <div className="hud-overlay">
        <SidePanel />
        <ClarityMeter label="Clarity" value={44} />
        <Health />
        {currentDialogue && <DialoguePanel dialogue={currentDialogue} />}
      </div>
    </div>
  )
}

export default Hud
