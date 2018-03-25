import * as React from 'react'
import { match, withRouter } from 'react-router'

interface Props {
  match?: match<{ sessionId?: string }>
  history: any
}

const LoaderComponent = ({ match, history }: Props) => {
  console.log('loader params', match)
  const sessionId =
    match && match.params && match.params.sessionId
      ? match.params.sessionId
      : 'new'

  if (!sessionId || sessionId == 'new') {
    console.log('create new')
    history.push(`/session/${sessionId}`)
  } else {
    console.log('load session')
    history.push(`/session/${sessionId}`)
  }
  console.log('history', history)
  return <div>loader</div>
}
export default withRouter(LoaderComponent)
