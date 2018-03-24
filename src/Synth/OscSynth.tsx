import { SynthPlayInfo, SynthStopHandler } from 'types'
import { getAudioCtx } from './audio'

interface SynthOptions {
  oscillator?: OscillatorType
}

interface SynthProps {
  oscillator: OscillatorType
}

const defaultProps: SynthProps = {
  oscillator: 'sine'
}

class OscSynth {
  props: SynthProps
  ctx: AudioContext
  constructor(options: SynthOptions = defaultProps) {
    this.props = { ...options, ...defaultProps }
    this.ctx = getAudioCtx()
  }

  play(info: SynthPlayInfo): SynthStopHandler {
    const osc = this.ctx.createOscillator()
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
