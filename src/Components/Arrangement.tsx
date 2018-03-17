import { Card, CardHeader } from 'material-ui/Card'
import * as React from 'react'
import { Arrangement } from 'types'

interface Props {
  arrangement: Arrangement
}

export default ({ arrangement }: Props) => (
  <div>
    <Card>
      <CardHeader title="Arrangement" />
    </Card>
  </div>
)
