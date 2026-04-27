'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { AlertBadge } from './AlertBadge'
import { BrowseChildItem } from '@/domain/models/child/browse-child-item.model'
import { StatusBadge } from './StatusBadge'

type Props = {
  child: BrowseChildItem
  onClick?: () => void
}

export const ChildrenRow = ({ child, onClick }: Props) => {
  return (
    <TableRow className={cn('cursor-pointer', onClick && 'hover:bg-muted/50')} onClick={onClick}>
      <TableCell>
        <p className='font-medium leading-tight'>{child.name}</p>
        <p className='text-xs text-muted-foreground mt-0.5'>{child.age}</p>
      </TableCell>
      <TableCell className='text-sm'>{child.neighborhood}</TableCell>
      <TableCell>
        <AlertBadge value={child.isHealthWithAlert} />
      </TableCell>
      <TableCell>
        <AlertBadge value={child.isEducationWithAlert} />
      </TableCell>
      <TableCell>
        <AlertBadge value={child.isAssistanceWithAlert} />
      </TableCell>
      <TableCell>
        <StatusBadge status={child.status} />
      </TableCell>
    </TableRow>
  )
}
