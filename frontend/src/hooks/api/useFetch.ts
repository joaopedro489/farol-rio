import { Query, useQuery } from '@tanstack/react-query'

export interface IUseFetchProps<T> {
  queryKey: any[]
  queryFn: () => Promise<T>
  refetchInterval?: number | false | ((query: Query<T>) => number | false | undefined)
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
  enabled?: boolean
  retry?: boolean | number | ((failureCount: number, error: unknown) => boolean)
}

export function useFetch<T>(params: IUseFetchProps<T>) {
  return useQuery<T>({
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...params,
  })
}
