import { SynthActions } from 'Containers/Session'
import * as React from 'react'
import OscSynth from 'Synth/OscSynth'
import { SynthPlayHandler, SynthPlayInfo, SynthStopHandler, Track } from 'types'

interface Props {
  actions: SynthActions
  track: Track
}

class SynthComponent extends React.Component<Props> {
  synth: OscSynth
  componentDidMount() {
    this.synth = new OscSynth()
    const { track: { index: trackIndex }, actions: { initSynth } } = this.props
    const handler: SynthPlayHandler = (
      info: SynthPlayInfo
    ): SynthStopHandler => {
      console.log('play synth', info)
      return this.synth.play(info)
    }
    initSynth(trackIndex, handler)
  }
  render() {
    return null
  }
}

export default SynthComponent
