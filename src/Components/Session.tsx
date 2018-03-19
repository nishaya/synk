import ArrangementComponent from 'Components/Arrangement'
import BlockComponent from 'Components/Block'
import BlockEditComponent from 'Components/BlockEdit'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import * as React from 'react'
import { Block, Session } from 'types'

interface Props {
  session: Session
}

const BlockSelect = ({ blocks }: { blocks: Block[] }) => (
  <SelectField>
    {blocks.map((block: Block) => (
      <MenuItem key={block.id} value={block.id}>
        {block.name}
      </MenuItem>
    ))}
  </SelectField>
)

export default ({ session }: Props) => (
  <div style={{ padding: '4px' }}>
    <h2>Session</h2>
    <RaisedButton label="default" />
    <div>numTracks: {session.numTracks}</div>
    {session.blocks.map((block: Block) => (
      <div key={block.id}>
        <BlockComponent block={block} />
      </div>
    ))}
    <BlockSelect blocks={session.blocks} />
    <BlockEditComponent blocks={session.blocks} />
    <ArrangementComponent arrangement={session.arrangement} />
  </div>
)
