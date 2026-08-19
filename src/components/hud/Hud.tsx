import Scene from '../scene/Scene'
import SidePanel from './SidePanel'
import ClarityMeter from './ClarityMeter'
import Health from './Health'
import DialoguePanel from './DialoguePanel'
import { usePlayer } from '../../PlayerContext'
import './Hud.css'

function Hud() {
  const { currentPassage } = usePlayer()

  return (
    <div className="hud">
      <Scene />
      <div className="hud-overlay">
        <SidePanel />
        <ClarityMeter label="Clarity" value={44} />
        <Health />
        {currentPassage && <DialoguePanel passage={currentPassage} />}
      </div>
    </div>
  )
}

export default Hud
