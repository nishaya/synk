import {
  OscSynthPreset,
  SynthPlayInfo,
  SynthPreset,
  SynthStopHandler
} from 'types'
import { note2freq } from 'Utils/music'
import { getAudioCtx } from './audio'

interface SynthOptions {
  oscillator?: OscillatorType
}

const MAX_ATTACK_TIME = 0.5
const MAX_DECAY_TIME = 0.5
const MAX_RELEASE_TIME = 1

const defaultPreset: OscSynthPreset = {
  type: 'osc',
  oscillator: 'square',
  aeg: {
    attack: 0,
    decay: 64,
    sustain: 127,
    release: 0
  },
  cutoff: 127,
  resonance: 0
}

export interface Synthesizer {
  ctx: AudioContext
  gain: GainNode
  level: number
  play(info: SynthPlayInfo): SynthStopHandler
  changePreset(preset: SynthPreset): void
  changeLevel(level: number): void
}

class OscSynth implements Synthesizer {
  preset: OscSynthPreset
  ctx: AudioContext
  gain: GainNode
  level: number = 100
  constructor(preset: SynthOptions) {
    this.ctx = getAudioCtx()
    this.gain = this.ctx.createGain()
    this.gain.connect(this.ctx.destination)
    this.changePreset({ ...defaultPreset, ...preset })
  }

  changePreset(preset: OscSynthPreset) {
    if (this.preset === preset) {
      return
    }
    this.preset = preset
  }

  changeLevel(level: number) {
    if (this.level === level) {
      return
    }
    this.level = level
    const volume = level / 127 * 0.8
    this.gain.gain.setValueAtTime(volume, this.ctx.currentTime)
  }

  play(info: SynthPlayInfo): SynthStopHandler {
    let osc: OscillatorNode | undefined = this.ctx.createOscillator()
    let gain: GainNode | undefined = this.ctx.createGain()
    osc.type = this.preset.oscillator
    osc.frequency.setValueAtTime(note2freq(info.note), this.ctx.currentTime)

    console.log('synth play', info)

    const volume = info.velocity / 127 * 0.5
    const start = info.time || this.ctx.currentTime
    const attack =
      start + 0.005 + this.preset.aeg.attack / 127 * MAX_ATTACK_TIME
    const sustain = volume * this.preset.aeg.sustain / 127
    const decay = attack + this.preset.aeg.decay / 127 * MAX_DECAY_TIME

    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(volume, attack)
    gain.gain.linearRampToValueAtTime(sustain, decay)

    gain.connect(this.gain)
    osc.connect(gain)

    osc.addEventListener('ended', () => {
      osc = undefined
      gain = undefined
    })

    osc.start(info.time || this.ctx.currentTime)

    const stop = (time: number = this.ctx.currentTime) => {
      const release = time + this.preset.aeg.release / 127 * MAX_RELEASE_TIME
      if (gain) {
        gain.gain.linearRampToValueAtTime(0, release)
      }
      if (osc) osc.stop(release)
    }

    if (info.duration) {
      stop(start + info.duration)
    }

    const stopHandler = () => {
      stop()
    }
    return stopHandler
  }
}

export default OscSynth
