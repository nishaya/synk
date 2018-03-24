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
    let osc: OscillatorNode | undefined = this.ctx.createOscillator()
    let gain: GainNode | undefined = this.ctx.createGain()
    osc.type = this.preset.oscillator
    osc.frequency.value = note2freq(info.note)

    console.log('synth play', info)

    const volume = info.velocity / 127 * 0.5
    const start = info.time || this.ctx.currentTime
    const attack = start + 0.005
    const sustain = volume * 0.6
    const decay = attack + 0.4

    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(volume, attack)
    gain.gain.linearRampToValueAtTime(sustain, decay)

    gain.connect(this.ctx.destination)
    osc.connect(gain)

    osc.addEventListener('ended', () => {
      console.log('cleanup nodes')
      osc = undefined
      gain = undefined
    })

    osc.start(info.time || this.ctx.currentTime)

    const stop = (time: number = this.ctx.currentTime) => {
      console.log('synth stop')
      const release = time + 0.3
      if (gain) gain.gain.linearRampToValueAtTime(0, release)
      if (osc) osc.stop(release)
    }

    const stopHandler = () => {
      stop()
    }
    return stopHandler
  }
}

export default OscSynth
