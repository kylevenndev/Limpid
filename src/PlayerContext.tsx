import { createContext, useContext, type ReactNode } from 'react'
import { useHealth } from './hooks/useHealth'

interface PlayerContextValue {
  health: ReturnType<typeof useHealth>
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const health = useHealth()
  return <PlayerContext.Provider value={{ health }}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
