import { createContext, useContext, type ReactNode } from 'react'
import { usePlayerPosition } from './hooks/usePlayerPosition'
import type { Position } from './types/player'

interface PositionContextType {
  position: Position
  moveTo: (target: Position) => void
}

const PositionContext = createContext<PositionContextType | null>(null)

export function PositionProvider({ children }: { children: ReactNode }) {
  const { position, moveTo } = usePlayerPosition()

  return (
    <PositionContext.Provider value={{ position, moveTo }}>{children}</PositionContext.Provider>
  )
}

export function usePosition() {
  const context = useContext(PositionContext)
  if (!context) {
    throw new Error('usePosition must be used within a PositionProvider')
  }
  return context
}
