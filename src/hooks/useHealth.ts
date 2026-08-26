import { useCallback, useEffect, useState } from 'react'
import type { HealthState } from '../types/health'
import { applyDamage, applyHeal, isDead } from '../utils/health'

const STORAGE_KEY = 'limpid:health'

function loadHealth(): HealthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { current: 3, max: 3 }
  } catch {
    return { current: 3, max: 3 }
  }
}

export function useHealth() {
  const [health, setHealth] = useState<HealthState>(loadHealth)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(health))
  }, [health])

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
