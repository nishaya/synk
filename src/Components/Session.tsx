import ArrangementComponent from 'Components/Arrangement'
import BlocksComponent from 'Components/Blocks'
import EditTools from 'Components/Controls/EditTools'
import Transport from 'Components/Controls/Transport'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import * as React from 'react'
import styled from 'styled-components'
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

const Tools = styled.div`
  display: flex;

  div:first-child {
    margin-right: auto;
  }
`

export default ({ session }: Props) => (
  <div style={{ padding: '4px' }}>
    <h2>Session</h2>
    <div>numTracks: {session.numTracks}</div>
    <div style={{ padding: '4px' }}>
      <Card>
        <CardHeader title="blocks" />
        <CardActions>
          <Tools>
            <div>
              <Transport handleRec={() => console.log('rec button pushed')} />
            </div>
            <div>
              <EditTools />
            </div>
          </Tools>
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
