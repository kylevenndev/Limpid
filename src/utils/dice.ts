import type { DiceRollResult } from '../types/dice'

export function rollDice(): number {
  return Math.floor(Math.random() * 20) + 1
}

export function resolveDifficultyCheck(difficulty: number): DiceRollResult {
  const roll = rollDice()
  return { roll, success: roll >= difficulty }
}
