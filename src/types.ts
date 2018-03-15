export interface Session {
  id: string
  blocks: Block[]
}

export interface Block {
  id: string
  patterns: Pattern[]
}

export interface Pattern {
  id: string
  notes: Note[]
}

export interface Note {
  note: number
  duration: number
  velocity: number
}
