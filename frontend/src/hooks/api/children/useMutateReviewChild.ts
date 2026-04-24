import { reviewChild } from '@/services/children/review-child'
import { useMutate } from '../useMutate'
import { QueryKeyEnum } from '@/domain/enum/query-keys.enum'
import { toast } from 'sonner'

export const useMutateReviewChild = () => {
  const mutate = useMutate({
    mutationFn: reviewChild,
    invalidateManyQueryKeys: [[QueryKeyEnum.CHILDREN], [QueryKeyEnum.CHILD]],
    onSuccess: () => {
      toast.success('Criança revisada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao revisar criança')
    }
  })

  return mutate
}
