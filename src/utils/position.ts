import type { Position } from '../types/player'

export function distance(a: Position, b: Position): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export function isNear(a: Position, b: Position, radius: number): boolean {
  return distance(a, b) <= radius
}

export function parsePercent(value: string): number {
  return parseFloat(value)
}

// Moves `current` toward `target`, but never further than `maxDistance`.
// If `target` is already within `maxDistance`, snaps exactly onto it (arrival).
export function moveToward(current: Position, target: Position, maxDistance: number): Position {
  const dist = distance(current, target)

  // Already close enough to reach target in one step — snap to it exactly.
  if (dist <= maxDistance) return target

  // Not close enough yet — move partway there.
  // `fractionToMove` is a ratio (0-1), NOT a distance and NOT a time value:
  // it's "what portion of the remaining gap do we close this step."
  // e.g. if target is 30 units away and maxDistance is 0.5, fractionToMove ≈ 0.017 (1.7%).
  const fractionToMove = maxDistance / dist

  return {
    x: current.x + (target.x - current.x) * fractionToMove,
    y: current.y + (target.y - current.y) * fractionToMove,
  }
}
