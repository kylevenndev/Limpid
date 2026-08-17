import choppingBoardData from './choppingBoard.json'
import mirrorData from './mirror.json'
import journalData from './journal.json'
import oldTrunkData from './oldTrunk.json'
import lanternData from './lantern.json'
import type { Interactable } from '../types/interactable'

export const interactables: Interactable[] = [
  choppingBoardData,
  mirrorData,
  journalData,
  oldTrunkData,
  lanternData,
] as Interactable[]
