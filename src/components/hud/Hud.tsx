import SceneBackground from '../scene/SceneBackground'
import SidePanel from './SidePanel'
import ClarityMeter from './ClarityMeter'
import Health from './Health'
import DialoguePanel from './DialoguePanel'
import type { DialogueChoice } from '../../types/dialogue'
import { useHealth } from '../../hooks/useHealth'
import './Hud.css'

const choices: DialogueChoice[] = [
  { text: 'Wind it slowly, and see what it remembers.' },
  { text: 'Recall the day this watch stopped.',
    meta: '(Dice 15)',
    difficulty: 15,
  },
  {
    text: 'Set the hour to now.',
    meta: 'Not enough Clarity',
    locked: true,
  },
]

function Hud() {
  const health = useHealth({ current: 3, max: 3 })

  return (
    <div className="hud">
      <SceneBackground />
      <div className="hud-overlay">
        <SidePanel />
        <ClarityMeter label="Clarity" value={44} />
        <Health current={health.current} max={health.max} />
        <DialoguePanel
          title="Faded Pocket Watch"
          narrative={[
            "The glass is spider-webbed with cracks, but the hands still crawl forward. Somewhere under the dial, something ticks that shouldn't. It smells faintly of rust and someone else's cologne.",
            'You could set it right. Or leave it broken, the way you found it.',
          ]}
          choices={choices}
          takeDamage={health.takeDamage}
        />
      </div>
    </div>
  )
}

export default Hud
