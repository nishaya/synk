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

export function isOscSynthPreset(v: any): v is OscSynthPreset {
  return v.type === 'osc'
}

export function isFmSynthPreset(v: any): v is FmSynthPreset {
  return v.type === 'fm'
}

export function isDrumsSynthPreset(v: any): v is DrumsSynthPreset {
  return v.type === 'drums'
}

export interface OscSynthPreset extends SynthPreset {
  type: 'osc'
  oscillator: OscillatorType
}

export interface FmSynthPreset extends SynthPreset {
  type: 'fm'
}

export interface DrumsSynthPreset extends SynthPreset {
  type: 'drums'
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
