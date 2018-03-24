import { DrumsSynthPreset, SynthPlayInfo, SynthStopHandler } from 'types'
import { getAudioCtx } from './audio'
import { Synthesizer } from './OscSynth'

interface SynthOptions {}

const NOTE_KICK = 36
// const NOTE_CHH = 43

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
  constructor(preset: SynthOptions) {
    this.preset = { ...defaultPreset, ...preset }
    this.ctx = getAudioCtx()
  }

  play(info: SynthPlayInfo): SynthStopHandler {
    const { note } = info
    if (note === NOTE_KICK) {
      this.playKick(info)
    }
    const stopHandler = () => {
      console.log('stop drums(dummy)', info)
    }
    return stopHandler
  }

  playKick(info: SynthPlayInfo): void {
    console.log('play kick', info)
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'

    const start = info.time || this.ctx.currentTime
    const attack = start + 0.05
    const decay = attack + 0.2
    const sustain = decay + 0.1

    osc.frequency.setValueAtTime(340, start)
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(1, start + 0.01)

    osc.frequency.exponentialRampToValueAtTime(80, attack)

    osc.frequency.exponentialRampToValueAtTime(30, decay)
    gain.gain.setValueAtTime(1, decay)

    gain.gain.linearRampToValueAtTime(0, sustain)

    gain.connect(this.ctx.destination)
    osc.connect(gain)
    osc.start(start)
    osc.stop(sustain)
  }
}

export default DrumsSynth
