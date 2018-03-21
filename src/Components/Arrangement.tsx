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
  padding: 8px;
  width: 100%;
  height: '64px';
  line-height: 2em;
`

const blockStyle = {
  display: 'inline-block',
  padding: '2px'
}

const Chip = styled.span`
  margin-left: 4px;
  padding: 4px;
  background-color: #ccc;
  color: #fff;
`

const barWidth = 32

const Block = ({
  blockInfo,
  block
}: {
  blockInfo: BlockInfo
  block: Block
}) => {
  const width = block.bars * blockInfo.repeat * barWidth
  return (
    <div style={{ width: `${width}px`, ...blockStyle }}>
      <BlockBase>
        {block.name}
        {blockInfo.repeat > 1 ? <Chip>x{blockInfo.repeat}</Chip> : null}
      </BlockBase>
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
        {arrangement.blocks.map((blockInfo: BlockInfo, i: number) => {
          const block = blocks.find((b: Block) => b.id === blockInfo.blockId)
          if (block) {
            return <Block key={i} block={block} blockInfo={blockInfo} />
          }
          return null
        })}
      </CardText>
    </Card>
  </div>
)
