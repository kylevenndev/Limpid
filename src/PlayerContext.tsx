import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useHealth } from './hooks/useHealth'
import type { Interactable } from './types/interactable'
import type { DialogueChoice, DialoguePassage } from './types/dialogue'

interface PlayerContextType {
  health: ReturnType<typeof useHealth>
  currentPassage: DialoguePassage | null
  openInteractable: (interactable: Interactable) => void
  selectChoice: (choice: DialogueChoice) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const health = useHealth()
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
    <PlayerContext.Provider value={{ health, currentPassage, openInteractable, selectChoice }}>
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
