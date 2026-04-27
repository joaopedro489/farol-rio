'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AlertTypeEnum } from '@/domain/enums/alert-type.enum'
import { ReviewStatusEnum } from '@/domain/enums/review-status.enum'
import { ChildrenFilters } from '../hooks/useChildrenFilters'
import { FilterSelect } from './FilterSelect'
import { FilterMultiSelect } from './FilterMultiSelect'
import { useFetchChildrenNeighborhoods } from '@/hooks/api/children/useFetchChildrenNeighborhoods'

const ALERT_OPTIONS = [
  { label: 'Saúde', value: AlertTypeEnum.HEALTH },
  { label: 'Educação', value: AlertTypeEnum.EDUCATION },
  { label: 'Assistência Social', value: AlertTypeEnum.SOCIAL_ASSISTANCE }
]

const STATUS_OPTIONS = [
  { label: 'Pendentes', value: ReviewStatusEnum.PENDING },
  { label: 'Revisados', value: ReviewStatusEnum.REVIEWED }
]

type Props = {
  filters: ChildrenFilters
  onSetFilters: (filters: Partial<ChildrenFilters>) => void
}

export const ChildrenFiltersBar = ({ filters, onSetFilters }: Props) => {
  const { neighborhoods } = useFetchChildrenNeighborhoods()

  return (
    <div className='flex items-center gap-3 flex-wrap'>
      <div className='relative'>
        <Search
          size={14}
          className='absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none'
        />
        <Input
          placeholder='buscar por nome'
          className='pl-8 w-56'
          value={filters.name ?? ''}
          onChange={(e) => onSetFilters({ name: e.target.value || undefined })}
        />
        {filters.name && (
          <button
            className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
            onClick={() => onSetFilters({ name: undefined })}
          >
            <X size={13} />
          </button>
        )}
      </div>
      <div className='flex items-center gap-2 flex-wrap'>
        <FilterMultiSelect
          label='Bairro'
          allLabel='Todos'
          options={neighborhoods.map((n) => ({ label: n, value: n }))}
          value={filters.neighborhood}
          onChange={(neighborhood) => onSetFilters({ neighborhood })}
        />
        <FilterMultiSelect<AlertTypeEnum>
          label='Alertas'
          allLabel='Qualquer área'
          options={ALERT_OPTIONS}
          value={filters.type}
          onChange={(type) => onSetFilters({ type })}
        />
        <FilterSelect<ReviewStatusEnum>
          label='Status'
          allLabel='Todos'
          options={STATUS_OPTIONS}
          value={filters.statusReview}
          onChange={(statusReview) => onSetFilters({ statusReview })}
        />
      </div>
    </div>
  )
}
