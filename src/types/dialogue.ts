export interface DialogueChoice {
  id: string
  text: string
  meta?: string
  locked?: boolean
  difficulty?: number
  next?: string
}

export interface Dialogue {
  id: string
  title: string
  text: string[]
  choices: DialogueChoice[]
}
