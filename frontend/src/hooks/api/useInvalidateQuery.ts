import { QueryKey, useQueryClient } from '@tanstack/react-query'

export function useInvalidateQuery() {
  const queryClient = useQueryClient()

  function invalidateQueryKey(queryKey: QueryKey) {
    queryClient.invalidateQueries({ queryKey, refetchType: 'all' })
  }

  return { invalidateQueryKey }
}
