import * as React from 'react'
import { match } from 'react-router'

interface Props {
  match?: match<{ sessionId?: string }>
}

const LoaderComponent = ({ match }: Props) => {
  console.log('loader params', match)
  return <div>loader</div>
}
export default LoaderComponent
