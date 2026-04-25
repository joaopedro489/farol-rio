'use client'

import { useRouter } from 'next/navigation'
import { useFetchBrowseChildren } from '@/hooks/api/children/useFetchBrowseChildren'
import { limit } from '@/constants/api'
import { ChildrenTable } from './ChildrenTable'
import { ChildrenFiltersBar } from './ChildrenFilters'
import { useChildrenFilters } from '../hooks/useChildrenFilters'
import { ROUTES } from '@/constants/routes'

export const ChildrenContent = () => {
  const router = useRouter()
  const { filters, setFilters, setOffset } = useChildrenFilters()

  const { children, isLoading } = useFetchBrowseChildren({
    name: filters.name,
    neighborhood: filters.neighborhood.length ? filters.neighborhood : undefined,
    type: filters.type.length ? filters.type : undefined,
    statusReview: filters.statusReview,
    offset: filters.offset,
    limit
  })

  const handleClickRow = (id: string) => {
    router.push(ROUTES.AUTHENTICATED.CHILDREN.path + `/${id}`)
  }

  return (
    <div className='p-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold'>Crianças acompanhadas</h1>
      </div>
      <ChildrenFiltersBar
        filters={filters}
        neighborhoods={children?.neighborhoods ?? []}
        onSetFilters={setFilters}
      />
      <ChildrenTable
        children={children?.items ?? []}
        total={children?.total ?? 0}
        limit={limit}
        offset={filters.offset}
        isLoading={isLoading}
        onClickRow={handleClickRow}
        onChangePage={setOffset}
      />
    </div>
  )
}
