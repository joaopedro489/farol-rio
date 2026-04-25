'use client'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

type Props<T extends string> = {
  label: string
  allLabel: string
  options: { label: string; value: T }[]
  value: T[]
  onChange: (value: T[]) => void
}

export function FilterMultiSelect<T extends string>({
  label,
  allLabel,
  options,
  value,
  onChange
}: Props<T>) {
  const current =
    value.length === 0
      ? allLabel
      : value.length === 1
        ? (options.find((o) => o.value === value[0])?.label ?? value[0])
        : `${value.length} selecionados`

  const toggle = (v: T) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-border bg-background hover:bg-muted transition-colors'>
          <span className='text-muted-foreground'>{label}:</span>
          <span className='font-medium'>{current}</span>
          <ChevronDown size={13} className='text-muted-foreground' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        {options.map((opt) => (
          <DropdownMenuCheckboxItem
            key={opt.value}
            checked={value.includes(opt.value)}
            onCheckedChange={() => toggle(opt.value)}
            onSelect={(e) => e.preventDefault()}
          >
            {opt.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
