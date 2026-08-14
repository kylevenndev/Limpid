export interface DialogueChoice {
  text: string
  meta?: string
  locked?: boolean
  difficulty?: number
  next?: string
}

export interface DialoguePassage {
  id: string
  title: string
  narrative: string[]
  choices: DialogueChoice[]
}
