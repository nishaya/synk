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
  constructor(options: SynthOptions = defaultProps) {
    this.props = { ...options, ...defaultProps }
  }
}

export default OscSynth
