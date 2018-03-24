import { DrumsSynthPreset, SynthPlayInfo, SynthStopHandler } from 'types'
import { note2freq } from 'Utils/music'
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
    osc.type = 'sine'
    osc.connect(this.ctx.destination)
    const start = info.time || this.ctx.currentTime
    osc.frequency.setValueAtTime(110, start)
    const attack = start + 0.05
    osc.frequency.exponentialRampToValueAtTime(880, start)
    const decay = attack + 0.2
    osc.frequency.exponentialRampToValueAtTime(220, decay)
    const sustain = decay + 0.3
    osc.frequency.exponentialRampToValueAtTime(110, sustain)

    osc.connect(this.ctx.destination)
    osc.start(start)
    osc.stop(sustain)
  }
}

export default DrumsSynth
