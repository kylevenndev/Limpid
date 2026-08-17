import type { DialoguePassage } from './dialogue'

export interface Interactable {
  id: string
  name: string
  passages: Record<string, DialoguePassage>
  startPassageId: string
  position: { top: string; left: string }
}
