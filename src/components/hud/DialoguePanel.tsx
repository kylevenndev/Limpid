import { resolveDifficultyCheck } from '../../utils/dice'
import { usePlayer } from '../../PlayerContext'

import './DialoguePanel.css'

function DialoguePanel() {
  const { health, currentDialogue, selectChoice, isChoiceVisited } = usePlayer()

  if (!currentDialogue) return

  return (
    <div className="hud-panel">
      <div className="hud-panel__title">{currentDialogue.title}</div>
      {currentDialogue.text.map((paragraph, i) => (
        <p key={i} className="hud-panel__text">
          {paragraph}
        </p>
      ))}
      <div className="hud-panel__spacer" />
      {currentDialogue.choices.length > 0 && (
        <div className="hud-panel__choices">
          {currentDialogue.choices.map((choice) => (
            <button
              type="button"
              key={choice.id}
              className={`hud-panel__choice${choice.locked ? ' hud-panel__choice--locked' : ''}${isChoiceVisited(currentDialogue.id, choice.id) ? ' hud-panel__choice--visited' : ''}`}
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
