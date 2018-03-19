import ArrangementComponent from 'Components/Arrangement'
import BlocksComponent from 'Components/Blocks'
import Transport from 'Components/Controls/Transport'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
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
    <div style={{ padding: '4px' }}>
      <Card>
        <CardHeader title="blocks" />
        <CardActions>
          <Transport handleRec={() => console.log('rec button pushed')} />
        </CardActions>
        <CardText>
          <BlockSelect blocks={session.blocks} />
          <BlocksComponent blocks={session.blocks} />
        </CardText>
      </Card>
    </div>

    <ArrangementComponent arrangement={session.arrangement} />
  </div>
)
