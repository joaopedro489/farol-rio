'use client'

import { BrowseChildItem } from '@/domain/models/child/browse-child-item.model'
import { AlertBadge } from './AlertBadge'
import { StatusBadge } from './StatusBadge'
import { MapPin } from 'lucide-react'
import { CPagination } from '@/components/c-pagination'
import { limit as limitDefault } from '@/constants/api'
import { NotFound } from '@/components/not-found'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type Props = {
  item: BrowseChildItem[]
  total: number
  limit?: number
  offset?: number
  isLoading?: boolean
  onClickRow?: (childId: string) => void
  onChangePage?: (offset: number) => void
}

export const ChildrenMobileList = ({
  item,
  total,
  limit = limitDefault,
  offset = 0,
  isLoading = false,
  onClickRow,
  onChangePage
}: Props) => {
  if (isLoading) return <Skeleton className='w-full h-32 rounded-md' />
  if (item.length === 0) return <NotFound />

  return (
    <div className='space-y-4'>
      <div className='space-y-3'>
        {item.map((child) => (
          <Card
            key={child.id}
            size='sm'
            className='cursor-pointer hover:bg-muted/50 transition-colors'
            onClick={() => onClickRow?.(child.id)}
          >
            <CardHeader className='flex flex-row items-start justify-between gap-2'>
              <div>
                <p className='font-medium text-sm leading-tight'>{child.name}</p>
                <div className='flex items-center gap-1 mt-0.5 text-xs text-muted-foreground'>
                  <MapPin size={10} />
                  <span>{child.neighborhood}</span>
                  <span>-</span>
                  <span>{child.age}</span>
                </div>
              </div>
              <StatusBadge status={child.status} />
            </CardHeader>
            <CardContent className='flex gap-2 flex-wrap'>
              <div className='flex items-center gap-1'>
                <span className='text-xs text-muted-foreground uppercase tracking-wide'>Saúde</span>
                <AlertBadge value={child.isHealthWithAlert} />
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-xs text-muted-foreground uppercase tracking-wide'>Educ.</span>
                <AlertBadge value={child.isEducationWithAlert} />
              </div>
              <div className='flex items-center gap-1'>
                <span className='text-xs text-muted-foreground uppercase tracking-wide'>
                  Assist.
                </span>
                <AlertBadge value={child.isAssistanceWithAlert} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CPagination
        page={Math.floor(offset / limit) + 1}
        totalPages={Math.ceil(total / limit)}
        totalCount={total}
        onChange={(p) => onChangePage?.((p - 1) * limit)}
      />
    </div>
  )
}
