export interface Session {
  id: string
  bpm: number
  created?: Date
  tracks: Track[]
  blocks: Block[]
  arrangement: Arrangement
}

export interface Track {
  index: number
  preset: SynthPreset
  level: number
  pan: number
  mute: boolean
  solo: boolean
}

export interface ADSR {
  attack: number
  decay: number
  sustain: number
  release: number
}

type SynthPresetType = 'osc' | 'drums' | 'fm'

export type SynthPreset = OscSynthPreset | FmSynthPreset | DrumsSynthPreset

export interface BaseSynthPreset {
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

export interface OscSynthPreset extends BaseSynthPreset {
  type: 'osc'
  oscillator: OscillatorType
  aeg: ADSR
  cutoff: number
  resonance: number
}

export interface FmSynthPreset extends BaseSynthPreset {
  type: 'fm'
}

export interface DrumsSynthPreset extends BaseSynthPreset {
  type: 'drums'
  kick: DrumPreset
  snare: DrumPreset
}

export interface DrumPreset {
  level: 100
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
  bars: number
  patterns: Pattern[]
}

export interface Pattern {
  id: string
  notes: Note[]
}

export interface Note {
  note: number
  position: number
  duration: number
  velocity: number
}

export interface SynthPlayInfo {
  note: number
  velocity: number
  duration?: number
  time?: number // undefined = play immediately
}

export type SynthStopHandler = () => void
export type SynthPlayHandler = (info: SynthPlayInfo) => SynthStopHandler
