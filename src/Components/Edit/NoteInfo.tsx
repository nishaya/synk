import * as React from 'react'
import { Note } from 'types'
import { position2time } from 'Utils/time'

interface Props {
  editNote?: Note | null
  previewNote?: Note | null
}

const previewStyle = {
  fontSize: 'middle',
  color: '#355c7d',
  letterSpacing: '0.1em',
  fontFamily: "'Roboto Mono', monospace"
}

export const NoteInfo = ({ editNote, previewNote }: Props) => {
  const note = editNote || previewNote
  return (
    <div>
      <code style={previewStyle}>
        {note
          ? `${position2time(note.position)} ${note.note} - ${note.duration}`
          : '-'}
      </code>
    </div>
  )
}
