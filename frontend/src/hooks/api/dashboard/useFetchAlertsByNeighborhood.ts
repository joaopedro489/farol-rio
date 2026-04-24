import { readAlertsByNeighborhood } from '@/services/dashboard/read-alerts-by-neighborhood'
import { useFetch } from '../useFetch'
import { QueryKeyEnum } from '@/domain/enum/query-keys.enum'

export const useFetchAlertsByNeighborhood = () => {
  const { data, ...response } = useFetch({
    queryFn: readAlertsByNeighborhood,
    queryKey: [QueryKeyEnum.DASHBOARD_ALERTS_BY_NEIGHBORHOOD]
  })

  return {
    alertsByNeighborhood: data,
    ...response
  }
}
