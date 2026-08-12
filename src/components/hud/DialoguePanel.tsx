import './DialoguePanel.css'

export interface DialogueChoice {
  text: string
  meta?: string
  locked?: boolean
  onSelect?: () => void
}

interface DialoguePanelProps {
  title: string
  narrative: string[]
  choices: DialogueChoice[]
}

function DialoguePanel({ title, narrative, choices }: DialoguePanelProps) {
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
            onClick={choice.onSelect}
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
