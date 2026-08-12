import SceneBackground from '../scene/SceneBackground'
import SidePanel from './SidePanel'
import ClarityMeter from './ClarityMeter'
import Health from './Health'
import DialoguePanel, { type DialogueChoice } from './DialoguePanel'
import './Hud.css'

const choices: DialogueChoice[] = [
  { text: 'Wind it slowly, and see what it remembers.' },
  { text: 'Recall the day this watch stopped.', meta: '75% (Past)' },
  {
    text: 'Set the hour to now.',
    meta: 'Requires Present Tier 2',
    locked: true,
  },
]

function Hud() {
  return (
    <div className="hud">
      <SceneBackground />
      <div className="hud-overlay">
        <SidePanel />
        <ClarityMeter label="Clarity" value={44} />
        <Health current={3} max={3} />
        <DialoguePanel
          title="Faded Pocket Watch"
          narrative={[
            "The glass is spider-webbed with cracks, but the hands still crawl forward. Somewhere under the dial, something ticks that shouldn't. It smells faintly of rust and someone else's cologne.",
            'You could set it right. Or leave it broken, the way you found it.',
          ]}
          choices={choices}
        />
      </div>
    </div>
  )
}

export default Hud
