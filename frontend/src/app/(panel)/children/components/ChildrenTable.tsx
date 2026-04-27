'use client'

import { BrowseChildItem } from '@/domain/models/child/browse-child-item.model'
import { limit as limitDefault } from '@/constants/api'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChildrenRow } from './ChildrenRow'
import { NotFound } from '@/components/not-found'
import { CPagination } from '@/components/c-pagination'

export type ChildrenTableProps = {
  items: BrowseChildItem[]
  total: number
  limit?: number
  offset?: number
  isLoading?: boolean
  onClickRow?: (childId: string) => void
  onChangePage?: (offset: number) => void
}

export const ChildrenTable = ({
  items,
  total,
  limit = limitDefault,
  offset = 0,
  isLoading = false,
  onClickRow,
  onChangePage
}: ChildrenTableProps) => {
  if (isLoading) return <Skeleton className='w-full h-10 rounded-md' />
  if (items.length === 0) return <NotFound />

  return (
    <div className='space-y-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Criança</TableHead>
            <TableHead>Bairro</TableHead>
            <TableHead>Saúde</TableHead>
            <TableHead>Educação</TableHead>
            <TableHead>Assistência</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((child) => (
            <ChildrenRow key={child.id} child={child} onClick={() => onClickRow?.(child.id)} />
          ))}
        </TableBody>
      </Table>

      <CPagination
        page={Math.floor(offset / limit) + 1}
        totalPages={Math.ceil(total / limit)}
        totalCount={total}
        onChange={(p) => onChangePage?.((p - 1) * limit)}
      />
    </div>
  )
}
