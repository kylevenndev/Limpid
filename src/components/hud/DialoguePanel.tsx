import type { DialogueChoice } from '../../types/dialogue'
import { resolveDifficultyCheck } from '../../utils/dice'
import { usePlayer } from '../../PlayerContext'
import './DialoguePanel.css'

interface DialoguePanelProps {
  title: string
  narrative: string[]
  choices: DialogueChoice[]
}

function DialoguePanel({ title, narrative, choices }: DialoguePanelProps) {
  const { health } = usePlayer()
  return (
    <div className="hud-panel">
      <div className="hud-panel__title">{title}</div>
      {narrative.map((paragraph, i) => (
        <p key={i} className="hud-panel__narrative">
          {paragraph}
        </p>
      ))}
      <div className="hud-panel__spacer" />
      <div className="hud-panel__choices">
        {choices.map((choice, i) => (
          <button
            type="button"
            key={i}
            className={`hud-panel__choice${choice.locked ? ' hud-panel__choice--locked' : ''}`}
            onClick={() => {
              if (choice.difficulty === undefined) return
              const result = resolveDifficultyCheck(choice.difficulty)
              if (!result.success) {
                health.takeDamage()
              }
              console.log(result)
            }}
            disabled={choice.locked}
          >
            <span className="hud-panel__arrow">→</span>
            <span>{choice.text}</span>
            {choice.meta && <span className="hud-panel__meta">{choice.meta}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DialoguePanel
