import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useHealth } from './hooks/useHealth'
import { usePlayerPosition } from './hooks/usePlayerPosition'
import { useVisitedChoices } from './hooks/useVisitedChoices'
import type { Interactable } from './types/interactable'
import type { DialogueChoice, Dialogue } from './types/dialogue'
import type { Position } from './types/player'

interface PlayerContextType {
  health: ReturnType<typeof useHealth>
  position: Position
  moveTo: (target: Position) => void
  currentDialogue: Dialogue | null
  openInteractable: (interactable: Interactable) => void
  selectChoice: (choice: DialogueChoice) => void
  isChoiceVisited: (dialogueId: string, choiceId: string) => boolean
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const health = useHealth()
  const { position, moveTo } = usePlayerPosition()
  const { markVisited, isVisited } = useVisitedChoices()
  const [activeInteractable, setActiveInteractable] = useState<Interactable | null>(null)
  const [currentDialogueId, setCurrentDialogueId] = useState<string | null>(null)

  const openInteractable = useCallback((interactable: Interactable) => {
    setActiveInteractable(interactable)
    setCurrentDialogueId(interactable.startDialogueId)
  }, [])

  const selectChoice = useCallback(
    (choice: DialogueChoice) => {
      if (activeInteractable && currentDialogueId) {
        markVisited(`${activeInteractable.id}:${currentDialogueId}:${choice.id}`)
      }
      if (choice.next === undefined) {
        setActiveInteractable(null)
        setCurrentDialogueId(null)
        return
      }
      setCurrentDialogueId(choice.next)
    },
    [activeInteractable, currentDialogueId, markVisited],
  )

  const isChoiceVisited = useCallback(
    (dialogueId: string, choiceId: string) =>
      activeInteractable ? isVisited(`${activeInteractable.id}:${dialogueId}:${choiceId}`) : false,
    [activeInteractable, isVisited],
  )

  const currentDialogue =
    activeInteractable && currentDialogueId ? activeInteractable.dialogue[currentDialogueId] : null

  return (
    <PlayerContext.Provider
      value={{
        health,
        position,
        moveTo,
        currentDialogue,
        openInteractable,
        selectChoice,
        isChoiceVisited,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
