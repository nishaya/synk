import * as React from 'react'
import { Note } from 'types'

interface Props {
  editNote?: Note | null
  previewNote?: Note | null
}

export const NoteInfo = ({ editNote, previewNote }: Props) => {
  const note = editNote || previewNote
  if (!note) return null
  return (
    <div>
      {note.note} - {note.duration}
    </div>
  )
}
