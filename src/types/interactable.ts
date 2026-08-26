import type { Dialogue } from './dialogue'

export interface Interactable {
  id: string
  name: string
  dialogue: Record<string, Dialogue>
  startDialogueId: string
  position: { top: string; left: string }
}
