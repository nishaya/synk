import { Mutations } from 'Containers/Session'
import * as React from 'react'

interface Props {
  bpm: number
  mutations: Mutations
}

const BpmComponent = ({ bpm }: Props) => {
  return <div>bpm: {bpm}</div>
}

export default BpmComponent
