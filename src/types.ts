export interface Session {
  id: string
  numTracks: number
  presets: Preset[]
  blocks: Block[]
  arrangement: Arrangement
}

export interface Arrangement {
  blocks: BlockInfo[]
}

export interface BlockInfo {
  blockId: string
  repeat: number
}

export interface Preset {
  oscillator: OscillatorType
}

export interface Block {
  id: string
  name: string
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
