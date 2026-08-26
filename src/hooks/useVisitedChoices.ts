import { useEffect, useState } from 'react'

const STORAGE_KEY = 'limpid:visitedChoices'

// Sets don't survive JSON directly, so we round-trip through an array.
function loadVisitedChoices(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function useVisitedChoices() {
  const [visitedChoices, setVisitedChoices] = useState<Set<string>>(loadVisitedChoices)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visitedChoices]))
  }, [visitedChoices])

  const markVisited = (key: string) => {
    setVisitedChoices((prev) => (prev.has(key) ? prev : new Set(prev).add(key)))
  }

  const isVisited = (key: string) => visitedChoices.has(key)

  return { markVisited, isVisited }
}
