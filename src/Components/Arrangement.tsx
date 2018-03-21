import Transport from 'Components/Controls/Transport'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import * as React from 'react'
import styled from 'styled-components'
import { Arrangement, BlockInfo } from 'types'

interface Props {
  arrangement: Arrangement
}

const Block = styled(Paper)`
  display: inline-block;
  padding: 8px;
`
export default ({ arrangement }: Props) => (
  <div style={{ padding: '4px' }}>
    <Card>
      <CardHeader title="Arrangement" />
      <CardActions>
        <Transport />
      </CardActions>
      <CardText>
        {arrangement.blocks.map((b: BlockInfo, i: number) => (
          <Block key={i}>{b.blockId}</Block>
        ))}
      </CardText>
    </Card>
  </div>
)
