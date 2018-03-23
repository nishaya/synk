import { SynthActions } from 'Containers/Session'
import * as React from 'react'
import { SynthPlayHandler, SynthPlayInfo, SynthStopHandler, Track } from 'types'

interface Props {
  actions: SynthActions
  track: Track
}

class SynthComponent extends React.Component<Props> {
  componentDidMount() {
    const { track: { index: trackIndex }, actions: { initSynth } } = this.props
    const handler: SynthPlayHandler = (
      info: SynthPlayInfo
    ): SynthStopHandler => {
      const stopHandler: SynthStopHandler = () => {}
      return stopHandler
    }
    initSynth(trackIndex, handler)
  }
  render() {
    return null
  }
}

export default SynthComponent
