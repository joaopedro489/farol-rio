'use client'

import { useSearchParams } from 'next/navigation'
import { useUrlQueryControl } from '@/hooks/useUrlQueryControl'
import { AlertTypeEnum } from '@/domain/enums/alert-type.enum'
import { ReviewStatusEnum } from '@/domain/enums/review-status.enum'

export interface ChildrenFilters {
  name?: string
  neighborhood: string[]
  type: AlertTypeEnum[]
  statusReview?: ReviewStatusEnum
  offset: number
}

export const useChildrenFilters = () => {
  const searchParams = useSearchParams()
  const { replaceManyQueryParam } = useUrlQueryControl()

  const filters: ChildrenFilters = {
    name: searchParams.get('name') ?? undefined,
    neighborhood: searchParams.getAll('neighborhood'),
    type: searchParams.getAll('type') as AlertTypeEnum[],
    statusReview: (searchParams.get('statusReview') as ReviewStatusEnum) ?? undefined,
    offset: Number(searchParams.get('offset') ?? 0)
  }

  const setFilters = (newFilters: Partial<ChildrenFilters>) => {
    replaceManyQueryParam({ ...filters, ...newFilters, offset: 0 })
  }

  const setOffset = (offset: number) => {
    replaceManyQueryParam({ ...filters, offset })
  }

  return { filters, setFilters, setOffset }
}
