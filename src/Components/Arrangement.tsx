import Transport from 'Components/Controls/Transport'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import * as React from 'react'
import styled from 'styled-components'
import { Arrangement, Block, BlockInfo } from 'types'

interface Props {
  arrangement: Arrangement
  blocks: Block[]
}

const BlockBase = styled(Paper)`
  display: inline-block;
  padding: 8px;
`

const blockStyle = {
  display: 'inline-block',
  padding: '2px'
}

const Block = ({ block }: { block: BlockInfo }) => {
  return (
    <div style={blockStyle}>
      <BlockBase>{block.blockId}</BlockBase>
    </div>
  )
}

export default ({ arrangement, blocks }: Props) => (
  <div style={{ padding: '4px' }}>
    <Card>
      <CardHeader title="Arrangement" />
      <CardActions>
        <Transport />
      </CardActions>
      <CardText>
        {arrangement.blocks.map((b: BlockInfo, i: number) => (
          <Block key={i} block={b} />
        ))}
      </CardText>
    </Card>
  </div>
)
