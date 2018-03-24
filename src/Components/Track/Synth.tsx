import { SynthActions } from 'Containers/Session'
import * as React from 'react'
import DrumsSynth from 'Synth/DrumsSynth'
import OscSynth, { Synthesizer } from 'Synth/OscSynth'
import {
  isDrumsSynthPreset,
  isOscSynthPreset,
  SynthPlayHandler,
  SynthPlayInfo,
  SynthPreset,
  SynthStopHandler,
  Track
} from 'types'

interface Props {
  actions: SynthActions
  track: Track
}

const synthFactory = (preset: SynthPreset): Synthesizer | null => {
  if (isOscSynthPreset(preset)) {
    return new OscSynth(preset)
  }
  if (isDrumsSynthPreset(preset)) {
    return new DrumsSynth(preset)
  }
  return null
}
class SynthComponent extends React.Component<Props> {
  synth: Synthesizer
  componentDidMount() {
    const {
      track: { index: trackIndex, preset },
      actions: { initSynth }
    } = this.props
    const synth = synthFactory(preset)
    if (synth) {
      this.synth = synth
      const handler: SynthPlayHandler = (
        info: SynthPlayInfo
      ): SynthStopHandler => {
        console.log('play synth', info)
        return this.synth.play(info)
      }
      initSynth(trackIndex, handler)
    }
  }
  render() {
    return null
  }
}

export default SynthComponent
