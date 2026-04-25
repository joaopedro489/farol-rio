import { useRouter } from 'next/router'
import { ChildHeader } from './ChildHeader'
import { useFetchReadChild } from '@/hooks/api/children/useFetchReadChild'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutateReviewChild } from '@/hooks/api/children/useMutateReviewChild'
import { getCardChildData } from '../utils/get-card-child.data'
import { ChildCard } from './ChildCard'
import { HeartIcon } from 'lucide-react'

export const ChildContent = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { child, isLoading } = useFetchReadChild({ id })

  const { mutateAsync: reviewChild } = useMutateReviewChild()
  const handleReviewChild = async () => {
    await reviewChild({ id })
  }

  const { educationCard, healthCard, socialAssistanceCard } = getCardChildData(child)

  if (isLoading) return <Skeleton className='w-full h-10 mb-4' />

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
        reviewedDate={child?.reviewedDate || undefined}
        onReview={handleReviewChild}
      />
      <div className='h-px w-full bg-muted my-6 flex flex-row'>
        <ChildCard
          Icon={HeartIcon}
          activeAlerts={child?.health?.alerts || []}
          body={healthCard || []}
          label='Saúde'
          isNull={healthCard === null}
        />
        <ChildCard
          Icon={HeartIcon}
          activeAlerts={child?.education?.alerts || []}
          body={educationCard || []}
          label='Educação'
          isNull={educationCard === null}
        />
        <ChildCard
          Icon={HeartIcon}
          activeAlerts={child?.socialAssistance?.alerts || []}
          body={socialAssistanceCard || []}
          label='Assistência Social'
          isNull={socialAssistanceCard === null}
        />
      </div>
    </div>
  )
}
