import { OscSynthPreset, SynthPlayInfo, SynthStopHandler } from 'types'
import { note2freq } from 'Utils/music'
import { getAudioCtx } from './audio'

interface SynthOptions {
  oscillator?: OscillatorType
}

const defaultPreset: OscSynthPreset = {
  type: 'osc',
  oscillator: 'square'
}

export interface Synthesizer {
  play(info: SynthPlayInfo): SynthStopHandler
}

class OscSynth implements Synthesizer {
  preset: OscSynthPreset
  ctx: AudioContext
  constructor(preset: SynthOptions) {
    this.preset = { ...defaultPreset, ...preset }
    this.ctx = getAudioCtx()
  }

  play(info: SynthPlayInfo): SynthStopHandler {
    const osc = this.ctx.createOscillator()
    osc.type = this.preset.oscillator
    osc.frequency.value = note2freq(info.note)
    osc.connect(this.ctx.destination)

    console.log('synth play', info)
    osc.start(info.time || this.ctx.currentTime)

    const stopHandler = () => {
      console.log('synth stop')
      osc.stop(this.ctx.currentTime)
    }
    return stopHandler
  }
}

export default OscSynth
