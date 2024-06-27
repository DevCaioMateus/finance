import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  columnIndex: number
  selectedColumns: Record<string, string | null>
  onChange: (columnsIndex: number, value: string | null) => void
}

// const options = ['valor', 'beneficiário', 'data']
const options = [
  { title: 'valor', value: 'value' },
  { title: 'beneficiário', value: 'payee' },
  { title: 'data', value: 'date' },
]

export const TableHeadSelect = ({
  columnIndex,
  selectedColumns,
  onChange,
}: Props) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`]
  return (
    <Select
      value={currentSelection || ''}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          'focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize',
          currentSelection && 'text-slate-500',
        )}
      >
        <SelectValue placeholder="Pular" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Pular</SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option.value) &&
            selectedColumns[`column_${columnIndex}`] !== option.value

          return (
            <SelectItem
              key={index}
              value={option.value}
              disabled={disabled}
              className="capitalize"
            >
              {option.title}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
