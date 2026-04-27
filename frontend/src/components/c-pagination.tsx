'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

type Props = {
  page: number
  totalPages: number
  totalCount?: number
  onChange: (page: number) => void
}

export const CPagination = ({ page, totalPages, totalCount, onChange }: Props) => {
  if (totalPages <= 1) return null

  return (
    <div className='flex items-center justify-between gap-4 flex-wrap'>
      <Pagination className='mx-0 w-auto'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious text='anterior' onClick={() => page > 1 && onChange(page - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => onChange(p)}
                className={p === page ? 'border-foreground font-semibold' : 'border border-border'}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              text='próxima'
              onClick={() => page < totalPages && onChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {totalCount !== undefined && (
        <p className='text-sm text-muted-foreground'>Total: {totalCount}</p>
      )}
    </div>
  )
}
