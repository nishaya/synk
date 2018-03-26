import { Block, Pattern, Session } from 'types'

interface FoundPattern {
  pattern: Pattern
  blockIndex: number
  patternIndex: number
}

export const findPattern = (
  session: Session,
  blockId: string,
  patternId: string
): FoundPattern | undefined => {
  let found: FoundPattern | undefined = undefined
  session.blocks.forEach((b: Block, bIndex: number) => {
    if (b.id === blockId) {
      b.patterns.forEach((p: Pattern, pIndex: number) => {
        if (p.id === patternId) {
          found = { pattern: p, blockIndex: bIndex, patternIndex: pIndex }
        }
      })
    }
  })
  return found
}
