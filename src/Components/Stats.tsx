import * as React from 'react'

const nav = navigator as any
const conn = nav.connection

console.log(conn)
const keys = ['downlink', 'downlinkMax', 'effectiveType', 'rtt', 'type']
export default () => (
  <div>
    <h2>stats</h2>
    <div>
      {keys.map((key: string) => <div key={key}>{`${key}: ${conn[key]}`}</div>)}
    </div>
  </div>
)
