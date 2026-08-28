import Scene from '../scene/Scene'
import SidePanel from './SidePanel'
import ClarityMeter from './ClarityMeter'
import Health from './Health'
import DialoguePanel from './DialoguePanel'
import './Hud.css'

function Hud() {
  return (
    <div className="hud">
      <Scene />
      <div className="hud-overlay">
        <SidePanel />
        <ClarityMeter label="Clarity" value={44} />
        <Health />
        <DialoguePanel/>
      </div>
    </div>
  )
}

export default Hud
