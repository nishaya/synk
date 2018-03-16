import * as React from 'react'
import { Session, Block } from 'types'
import BlockComponent from 'Components/Block'

interface Props {
  session: Session
}

export default ({ session }: Props) => (
  <div>
    <h2>Session</h2>
    <div>numTracks: {session.numTracks}</div>
    {session.blocks.map((block: Block) => (
      <div key={block.id}>
        <BlockComponent block={block} />
      </div>
    ))}
  </div>
)
