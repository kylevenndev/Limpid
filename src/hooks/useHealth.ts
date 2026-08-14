import { useCallback, useState } from 'react'
import type { HealthState } from '../types/health'
import { applyDamage, applyHeal, isDead } from '../utils/health'

export function useHealth() {
  const [health, setHealth] = useState<HealthState>({ current: 3, max: 3 })

  // WITHOUT useCallback,:
  // const takeDamage = (amount: number) => {
  //   setHealth((prev) => applyDamage(prev, amount))
  // }
  // const heal = (amount: number) => {
  //   setHealth((prev) => applyHeal(prev, amount))
  // }  

  const takeDamage = useCallback(() => {
    setHealth((prev) => applyDamage(prev, 1))
  }, [])

  const heal = useCallback(() => {
    setHealth((prev) => applyHeal(prev, 1))
  }, [])

  return {
    current: health.current,
    max: health.max,
    isDead: isDead(health),
    takeDamage,
    heal,
  }
}
