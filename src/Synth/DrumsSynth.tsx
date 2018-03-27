import { DrumsSynthPreset, SynthPlayInfo, SynthStopHandler } from 'types'
import { getAudioCtx } from './audio'
import { generateWhiteNoise } from './noise'
import { Synthesizer } from './OscSynth'

interface SynthOptions {}

const NOTE_KICK = 36
const NOTE_CHH = 43
const NOTE_OHH = 47

const defaultPreset: DrumsSynthPreset = {
  type: 'drums',
  kick: {
    level: 100
  },
  snare: {
    level: 100
  }
}

class DrumsSynth implements Synthesizer {
  preset: DrumsSynthPreset
  ctx: AudioContext
  noise: AudioBuffer
  gain: GainNode
  level: number = 100

  constructor(preset: SynthOptions) {
    this.ctx = getAudioCtx()
    this.noise = generateWhiteNoise(this.ctx)
    this.gain = this.ctx.createGain()
    this.changePreset({ ...defaultPreset, ...preset })
  }

  changePreset(preset: DrumsSynthPreset) {
    this.preset = preset
  }

  changeLevel(level: number) {
    this.level = level
    const volume = level / 127 * 0.8
    this.gain.gain.setValueAtTime(volume, this.ctx.currentTime)
  }

  play(info: SynthPlayInfo): SynthStopHandler {
    const { note } = info
    if (note === NOTE_KICK) {
      this.playKick(info)
    } else if (note === NOTE_CHH) {
      this.playHihat(info, false)
    } else if (note === NOTE_OHH) {
      this.playHihat(info, true)
    }
    const stopHandler = () => {
      console.log('stop drums(dummy)', info)
    }
    return stopHandler
  }

  playHihat(info: SynthPlayInfo, open: boolean = false): void {
    const source = this.ctx.createBufferSource()
    let duration = 0.01
    let release = 0.02
    let sustain = 1.0
    const gain = this.ctx.createGain()

    if (open) {
      duration = 0.001
      release = 0.3
      sustain = 0.5
    }

    const { velocity } = info
    const start = info.time || this.ctx.currentTime

    source.buffer = this.noise
    source.loop = true
    const volume = velocity / 127 * 0.3
    gain.gain.setValueAtTime(volume, start)
    gain.gain.setValueAtTime(volume * sustain, start + duration)
    gain.gain.exponentialRampToValueAtTime(0.01, start + duration + release)
    source.connect(gain)
    gain.connect(this.ctx.destination)
    source.start(start)
    source.stop(start + duration + release)
  }

  playKick(info: SynthPlayInfo): void {
    console.log('play kick', info)
    let osc: OscillatorNode | undefined = this.ctx.createOscillator()
    let gain: GainNode | undefined = this.ctx.createGain()
    osc.type = 'sine'

    const start = info.time || this.ctx.currentTime
    const attack = start + 0.05
    const decay = attack + 0.1
    const sustain = decay + 0.05

    const volume = info.velocity / 127 * 0.5

    osc.frequency.setValueAtTime(340, start)
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(volume, start + 0.01)

    osc.frequency.exponentialRampToValueAtTime(80, attack)

    osc.frequency.exponentialRampToValueAtTime(30, decay)
    gain.gain.setValueAtTime(volume, decay)

    gain.gain.linearRampToValueAtTime(0, sustain)

    gain.connect(this.ctx.destination)
    osc.connect(gain)

    osc.addEventListener('ended', () => {
      osc = undefined
      gain = undefined
    })

    osc.start(start)
    osc.stop(sustain)
  }
}

export default DrumsSynth
