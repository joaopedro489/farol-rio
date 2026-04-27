import { reviewChild } from '@/services/children/review-child'
import { useMutate } from '../useMutate'
import { QueryKeyEnum } from '@/domain/enums/query-keys.enum'
import { toast } from 'sonner'

export const useMutateReviewChild = () => {
  const mutate = useMutate({
    mutationFn: reviewChild,
    invalidateManyQueryKeys: [
      [QueryKeyEnum.CHILDREN],
      [QueryKeyEnum.CHILD],
      [QueryKeyEnum.DASHBOARD_SUMMARY]
    ],
    refetchType: 'all',
    onSuccess: () => {
      toast.success('Revisão registrada')
    },
    onError: () => {
      toast.error('Erro ao revisar criança')
    }
  })

  return mutate
}
