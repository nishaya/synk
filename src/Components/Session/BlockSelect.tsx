import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import * as React from 'react'
import { Block } from 'types'

const BlockSelect = ({
  value,
  blocks,
  onChange
}: {
  value: string | null
  blocks: Block[]
  onChange: (v: string) => void
}) => (
  <SelectField
    value={value}
    onChange={(
      e: React.SyntheticEvent<HTMLSelectElement>,
      i: number,
      v: string
    ) => onChange(v)}
  >
    {blocks.map((block: Block) => (
      <MenuItem key={block.id} value={block.id} primaryText={block.name} />
    ))}
  </SelectField>
)

export default BlockSelect
