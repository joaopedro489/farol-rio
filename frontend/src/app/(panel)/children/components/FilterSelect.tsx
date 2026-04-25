'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

type FilterSelectProps<T extends string> = {
  label: string
  allLabel: string
  options: { label: string; value: T }[]
  value: T | undefined
  onChange: (value: T | undefined) => void
}

export function FilterSelect<T extends string>({
  label,
  allLabel,
  options,
  value,
  onChange
}: FilterSelectProps<T>) {
  const current = options.find((o) => o.value === value)?.label ?? allLabel

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
        <DropdownMenuItem onClick={() => onChange(undefined)}>{allLabel}</DropdownMenuItem>
        {options.map((opt) => (
          <DropdownMenuItem key={opt.value} onClick={() => onChange(opt.value)}>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
