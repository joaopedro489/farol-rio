import { readSummary } from '@/services/dashboard/read-summary'
import { useFetch } from '../useFetch'
import { QueryKeyEnum } from '@/domain/enum/query-keys.enum'

export const useFetchSummary = () => {
  const { data, ...response } = useFetch({
    queryFn: readSummary,
    queryKey: [QueryKeyEnum.DASHBOARD_SUMMARY]
  })

  return {
    summary: data,
    ...response
  }
}
