import type { DialoguePassage } from '../../types/dialogue'
import { resolveDifficultyCheck } from '../../utils/dice'
import { usePlayer } from '../../PlayerContext'
import './DialoguePanel.css'

interface DialoguePanelProps {
  passage: DialoguePassage
}

function DialoguePanel({ passage }: DialoguePanelProps) {
  const { health, selectChoice } = usePlayer()
  return (
    <div className="hud-panel">
      <div className="hud-panel__title">{passage.title}</div>
      {passage.narrative.map((paragraph, i) => (
        <p key={i} className="hud-panel__narrative">
          {paragraph}
        </p>
      ))}
      <div className="hud-panel__spacer" />
      {passage.choices.length > 0 && (
        <div className="hud-panel__choices">
          {passage.choices.map((choice, i) => (
            <button
              type="button"
              key={i}
              className={`hud-panel__choice${choice.locked ? ' hud-panel__choice--locked' : ''}`}
              onClick={() => {
                if (choice.difficulty !== undefined) {
                  const result = resolveDifficultyCheck(choice.difficulty)
                  if (!result.success) {
                    health.takeDamage()
                  }
                }
                selectChoice(choice)
              }}
              disabled={choice.locked}
            >
              <span className="hud-panel__arrow">→</span>
              <span>{choice.text}</span>
              {choice.meta && <span className="hud-panel__meta">{choice.meta}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DialoguePanel
