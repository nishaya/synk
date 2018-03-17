import BlockComponent from 'Components/Block'
import RaisedButton from 'material-ui/RaisedButton'
import * as React from 'react'
import { Block, Session } from 'types'

interface Props {
  session: Session
}

export default ({ session }: Props) => (
  <div>
    <h2>Session</h2>
    <RaisedButton label="default" />
    <div>numTracks: {session.numTracks}</div>
    {session.blocks.map((block: Block) => (
      <div key={block.id}>
        <BlockComponent block={block} />
      </div>
    ))}
  </div>
)
