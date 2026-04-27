'use client'

import { useParams } from 'next/navigation'
import { ChildHeader } from './ChildHeader'
import { useFetchReadChild } from '@/hooks/api/children/useFetchReadChild'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutateReviewChild } from '@/hooks/api/children/useMutateReviewChild'
import { getCardChildData } from '../utils/get-card-child.data'
import { ChildCard } from './ChildCard'
import { Heart, BookOpen, HandHeart } from 'lucide-react'

export const ChildContent = () => {
  const params = useParams()
  const id = params.id as string
  const { child, isLoading } = useFetchReadChild({ id })

  const { mutateAsync: reviewChild } = useMutateReviewChild()
  const handleReviewChild = async () => {
    await reviewChild({ id })
  }

  const { educationCard, healthCard, socialAssistanceCard } = getCardChildData(child)

  const allNull = healthCard === null && educationCard === null && socialAssistanceCard === null

  if (isLoading) return <Skeleton className='w-full h-100 mb-4' />

  return (
    <div>
      <ChildHeader
        age={child?.age || ''}
        name={child?.name || ''}
        initials={child?.initials || ''}
        neighborhood={child?.neighborhood || ''}
        responsible={child?.responsible || ''}
        isReviewed={child?.isReviewed}
        reviewedBy={child?.reviewedByEmail || ''}
        reviewedDate={child?.reviewedAt || undefined}
        onReview={handleReviewChild}
      />
      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <ChildCard
          Icon={Heart}
          activeAlerts={child?.health?.alerts || []}
          body={healthCard || []}
          label='Saúde'
          isNull={healthCard === null}
        />
        <ChildCard
          Icon={BookOpen}
          activeAlerts={child?.education?.alerts || []}
          body={educationCard || []}
          label='Educação'
          isNull={educationCard === null}
        />
        <ChildCard
          Icon={HandHeart}
          activeAlerts={child?.socialAssistance?.alerts || []}
          body={socialAssistanceCard || []}
          label='Assistência Social'
          isNull={socialAssistanceCard === null}
        />
      </div>
      {allNull && child && (
        <div className='mt-4 bg-attention-soft text-attention rounded-md p-4'>
          <p className='text-sm font-semibold'>Cobertura incompleta nas três áreas</p>
          <p className='text-sm mt-1'>
            {child.name} está cadastrada no painel, mas ainda não há registros nos sistemas de
            saúde, educação ou assistência social. Solicite vínculo aos sistemas de origem antes de
            revisar.
          </p>
        </div>
      )}
    </div>
  )
}
