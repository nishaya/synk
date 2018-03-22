import SessionComponent from 'Components/Session'
import * as React from 'react'
import { session } from 'Utils/fixtures'

export default () => (
  <div>
    <SessionComponent session={session} />
  </div>
)
