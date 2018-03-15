export interface Session {
  id: string
  numTracks: number
  presets: Preset[]
  blocks: Block[]
}

export interface Preset {
  oscillator: OscillatorType
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
