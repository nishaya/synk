import { Block, Session, Track } from 'types'

export const genBlock = (session: Session): Block => {
  const block: Block = {
    bars: 4,
    id: `block-${session.blocks.length}`,
    name: 'New Block',
    patterns: session.tracks.map((t: Track, i: number) => {
      return {
        id: `p-${session.blocks.length}-${i}`,
        notes: []
      }
    })
  }
  return block
}
