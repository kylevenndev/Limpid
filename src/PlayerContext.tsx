import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useHealth } from './hooks/useHealth'
import { usePlayerPosition } from './hooks/usePlayerPosition'
import type { Interactable } from './types/interactable'
import type { DialogueChoice, DialoguePassage } from './types/dialogue'
import type { Position } from './types/player'

interface PlayerContextType {
  health: ReturnType<typeof useHealth>
  position: Position
  moveTo: (target: Position) => void
  currentPassage: DialoguePassage | null
  openInteractable: (interactable: Interactable) => void
  selectChoice: (choice: DialogueChoice) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const health = useHealth()
  const { position, moveTo } = usePlayerPosition()
  const [activeInteractable, setActiveInteractable] = useState<Interactable | null>(null)
  const [currentPassageId, setCurrentPassageId] = useState<string | null>(null)

  const openInteractable = useCallback((interactable: Interactable) => {
    setActiveInteractable(interactable)
    setCurrentPassageId(interactable.startPassageId)
  }, [])

  const selectChoice = useCallback((choice: DialogueChoice) => {
    if (choice.next === undefined) {
      setActiveInteractable(null)
      setCurrentPassageId(null)
      return
    }
    setCurrentPassageId(choice.next)
  }, [])

  const currentPassage =
    activeInteractable && currentPassageId ? activeInteractable.passages[currentPassageId] : null

  return (
    <PlayerContext.Provider
      value={{ health, position, moveTo, currentPassage, openInteractable, selectChoice }}
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
