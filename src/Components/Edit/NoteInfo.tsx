import * as React from 'react'
import { Note } from 'types'
import { note2name } from 'Utils/music'
import { position2time } from 'Utils/time'

interface Props {
  editNote?: Note | null
  previewNote?: Note | null
}

const previewStyle: React.CSSProperties = {
  fontSize: 'middle',
  color: '#355c7d',
  letterSpacing: '0.1em',
  fontFamily: "'Roboto Mono', monospace",
  fontWeight: 700
}

export const NoteInfo = ({ editNote, previewNote }: Props) => {
  const note = editNote || previewNote
  return (
    <div>
      <code style={previewStyle}>
        {note
          ? `${position2time(note.position)} ${note2name(note.note)} - ${
              note.duration
            }`
          : '-'}
      </code>
    </div>
  )
}
