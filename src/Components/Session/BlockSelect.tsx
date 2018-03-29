import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import * as React from 'react'
import { Block } from 'types'

const BlockSelect = ({
  value,
  blocks,
  onChange
}: {
  value: number | null
  blocks: Block[]
  onChange: (blockIndex: number) => void
}) => (
  <SelectField
    value={value}
    onChange={(
      e: React.SyntheticEvent<HTMLSelectElement>,
      i: number,
      v: number
    ) => onChange(i)}
    style={{ width: 200 }}
  >
    {blocks.map((block: Block, i: number) => (
      <MenuItem key={block.id} value={i} primaryText={block.name} />
    ))}
  </SelectField>
)

export default BlockSelect
