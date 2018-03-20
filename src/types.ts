export interface Session {
  id: string
  tracks: Track[]
  blocks: Block[]
  arrangement: Arrangement
}

export interface Track {
  preset: SynthPreset
  level: number
  pan: number
}

type SynthPresetType = 'osc' | 'drums' | 'fm'

export interface SynthPreset {
  type: SynthPresetType
}

export interface Arrangement {
  blocks: BlockInfo[]
}

export interface BlockInfo {
  blockId: string
  repeat: number
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
