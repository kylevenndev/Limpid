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

export function stepToward(current: Position, target: Position, maxDistanceThisFrame: number): Position {
  const distanceToTarget = distance(current, target)

  // Snap to target
  if (distanceToTarget <= maxDistanceThisFrame) return target

  // `fractionToMove` is a ratio (0-1), NOT a distance and NOT a time value:
  // it's "what portion of the remaining gap do we close this step."
  // e.g. if target is 30 units away and maxDistanceThisFrame is 0.5, fractionToMove ≈ 0.017 (1.7%).
  const fractionToMove = maxDistanceThisFrame / distanceToTarget

  return {
    x: current.x + (target.x - current.x) * fractionToMove,
    y: current.y + (target.y - current.y) * fractionToMove,
  }
}
