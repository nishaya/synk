import * as React from 'react'
import { Pattern } from 'types'

interface Props {
  pattern: Pattern
}

export default ({ pattern }: Props) => (
  <div>
    <pre>{JSON.stringify(pattern.notes, null, 4)}</pre>
  </div>
)
