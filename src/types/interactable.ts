import type { DialoguePassage } from './dialogue'

export interface Interactable {
  id: string
  passages: Record<string, DialoguePassage>
  startPassageId: string
}
