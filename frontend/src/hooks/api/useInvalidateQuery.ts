import { QueryKey, useQueryClient } from '@tanstack/react-query'

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient()

  const invalidateQueryKey = (queryKey: QueryKey) => {
    queryClient.invalidateQueries({ queryKey, refetchType: 'all' })
  }

  return { invalidateQueryKey }
}
