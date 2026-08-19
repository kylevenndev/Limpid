import { useCallback, useEffect, useRef, useState } from 'react'
import type { Position } from '../types/player'
import { moveToward } from '../utils/position'

const SPEED = 30 // how many percent-units of the scene the player crosses per second

export function usePlayerPosition() {
  // `position` is the only value that should trigger a re-render — it's what Player.tsx draws.
  const [position, setPosition] = useState<Position>({ x: 50, y: 70 })

  // Everything below is a ref, not state — the loop reads/writes these every single
  // frame (~60x/sec), and none of them should cause a re-render on their own.
  // Only `setPosition` should ever trigger one.

  // Mirrors `position`, but as a ref, so the loop always reads the LATEST value —
  // the loop function itself never gets recreated, so state would go stale here.
  const positionRef = useRef(position)

  // Where we're currently walking toward. Overwriting this is all `moveTo` needs to do
  // to redirect mid-walk — the loop just picks up the new value on its next frame.
  const targetRef = useRef(position)

  // Timestamp of the previous frame, used to compute elapsed time (deltaTime).
  // `undefined` means "no baseline yet" — used to skip movement on the very first frame.
  const lastTimeRef = useRef<number | undefined>(undefined)

  // The id requestAnimationFrame returns, so we know if a loop is already running
  // (and can cancel it later on unmount).
  const frameRef = useRef<number | undefined>(undefined)

  // The animation loop — called once per screen frame while a walk is in progress.
  const step = useCallback((timestamp: number) => {
    if (lastTimeRef.current === undefined) {
      // First frame of this walk: just record the starting clock time.
      // No previous timestamp to diff against yet, so skip movement this frame.
      lastTimeRef.current = timestamp
      frameRef.current = requestAnimationFrame(step)
      return
    }

    // Seconds elapsed since the last frame (requestAnimationFrame gives ms).
    const deltaTime = (timestamp - lastTimeRef.current) / 1000
    lastTimeRef.current = timestamp

    // How far we're allowed to move THIS frame, given our speed and elapsed time.
    const maxDistancePerFrame = SPEED * deltaTime

    const next = moveToward(positionRef.current, targetRef.current, maxDistancePerFrame)
    positionRef.current = next
    setPosition(next) // this is what actually moves the dot on screen

    // moveToward returns the exact same `target` object (not a copy) once we've
    // arrived, so this is a same-object check, not a numeric comparison.
    if (next === targetRef.current) {
      frameRef.current = undefined
      lastTimeRef.current = undefined
      return // arrived — don't schedule another frame
    }

    frameRef.current = requestAnimationFrame(step)
  }, [])

  const moveTo = useCallback((target: Position) => {
    targetRef.current = target
    // Only start a new loop if one isn't already running. If we're mid-walk,
    // the existing loop will just pick up this new target on its next frame.
    if (frameRef.current === undefined) {
      frameRef.current = requestAnimationFrame(step)
    }
  }, [step])

  // If this component tree is ever unmounted mid-walk, cancel the pending frame
  // so it doesn't try to update state that no longer exists.
  useEffect(() => {
    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return { position, moveTo }
}
