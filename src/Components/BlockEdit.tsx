import { Card, CardHeader, CardText } from 'material-ui/Card'
import * as React from 'react'
import { Block } from 'types'

interface Props {
  blocks: Block[]
}

export default ({ blocks }: Props) => (
  <div style={{ padding: '4px' }}>
    <Card>
      <CardHeader title="block edit" />
      <CardText>edit blocks</CardText>
    </Card>
  </div>
)
