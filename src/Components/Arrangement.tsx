import Transport from 'Components/Controls/Transport'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import * as React from 'react'
import { Arrangement } from 'types'

interface Props {
  arrangement: Arrangement
}

export default ({ arrangement }: Props) => (
  <div>
    <Card>
      <CardHeader
        title="Arrangement"
        showExpandableButton={true}
        actAsExpander={true}
      />
      <CardActions>
        <Transport />
      </CardActions>
      <CardText expandable={true}>
        <div>edit area</div>
      </CardText>
    </Card>
  </div>
)
