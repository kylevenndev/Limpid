import type { Dialogue } from '../../types/dialogue'
import { resolveDifficultyCheck } from '../../utils/dice'
import { usePlayer } from '../../PlayerContext'
import './DialoguePanel.css'

function DialoguePanel({ dialogue }: { dialogue: Dialogue }) {
  const { health, selectChoice, isChoiceVisited } = usePlayer()
  return (
    <div className="hud-panel">
      <div className="hud-panel__title">{dialogue.title}</div>
      {dialogue.text.map((paragraph, i) => (
        <p key={i} className="hud-panel__text">
          {paragraph}
        </p>
      ))}
      <div className="hud-panel__spacer" />
      {dialogue.choices.length > 0 && (
        <div className="hud-panel__choices">
          {dialogue.choices.map((choice) => (
            <button
              type="button"
              key={choice.id}
              className={`hud-panel__choice${choice.locked ? ' hud-panel__choice--locked' : ''}${isChoiceVisited(dialogue.id, choice.id) ? ' hud-panel__choice--visited' : ''}`}
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
