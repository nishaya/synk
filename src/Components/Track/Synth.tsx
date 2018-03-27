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
      track: { index: trackIndex, preset, level },
      actions: { initSynth }
    } = this.props
    const synth = synthFactory(preset)
    if (synth) {
      synth.changeLevel(level)
      this.synth = synth
      const handler: SynthPlayHandler = (
        info: SynthPlayInfo
      ): SynthStopHandler => {
        return this.synth.play(info)
      }
      initSynth(trackIndex, handler)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log('synth update', this.props.track, nextProps.track)
    const { track: { preset: nextPreset, level: nextLevel } } = nextProps
    this.synth.changeLevel(nextLevel)
    this.synth.changePreset(nextPreset)
  }

  render() {
    return null
  }
}

export default SynthComponent
