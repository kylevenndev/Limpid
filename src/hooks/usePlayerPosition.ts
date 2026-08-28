import { useCallback, useEffect, useRef, useState } from 'react'
import type { Position } from '../types/player'
import { stepToward } from '../utils/position'

// Percentage of width the player moves per second.
// E.g. Width = 1000, Speed = 30, Player moves 300pixels per second.
const SPEED = 30
const STORAGE_KEY = 'limpid:position'

function loadPosition(): Position {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { x: 50, y: 70 }
  } catch {
    return { x: 50, y: 70 }
  }
}

export function usePlayerPosition() {
  const [position, setPosition] = useState<Position>(loadPosition)

  const positionRef = useRef(position)
  const targetRef = useRef(position)

  const lastTimeRef = useRef<number | undefined>(undefined)
  const frameRef = useRef<number | undefined>(undefined)

  const step = useCallback((timestamp: number) => {

    // To calculate the time delta
    if (lastTimeRef.current === undefined) {
      lastTimeRef.current = timestamp
      frameRef.current = requestAnimationFrame(step)
      return
    }

    const deltaTime = (timestamp - lastTimeRef.current) / 1000
    lastTimeRef.current = timestamp

    const maxDistanceThisFrame = SPEED * deltaTime

    const nextPosition = stepToward(positionRef.current, targetRef.current, maxDistanceThisFrame)
    positionRef.current = nextPosition
    setPosition(nextPosition)

    if (nextPosition === targetRef.current) {
      frameRef.current = undefined
      lastTimeRef.current = undefined
      return
    }

    frameRef.current = requestAnimationFrame(step)
  }, [])

  const moveTo = useCallback((target: Position) => {
    targetRef.current = target
    if (frameRef.current === undefined) {
      frameRef.current = requestAnimationFrame(step)
    }
  }, [step])

  useEffect(() => {
    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(position))
  }, [position])

  return { position, moveTo }
}
