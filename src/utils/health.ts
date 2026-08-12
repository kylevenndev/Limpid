import type { HealthState } from '../types/health'

export function clampHealth(current: number, max: number): number {
  return Math.max(0, Math.min(current, max))
}

export function applyDamage(state: HealthState, amount: number): HealthState {
  return { ...state, current: clampHealth(state.current - amount, state.max) }
}

export function applyHeal(state: HealthState, amount: number): HealthState {
  return { ...state, current: clampHealth(state.current + amount, state.max) }
}

export function isDead(state: HealthState): boolean {
  return state.current <= 0
}
