import { readAlertsByType } from '@/services/dashboard/read-alerts-by-type'
import { useFetch } from '../useFetch'
import { QueryKeyEnum } from '@/domain/enums/query-keys.enum'

export const useFetchAlertsByType = () => {
  const { data, ...response } = useFetch({
    queryFn: readAlertsByType,
    queryKey: [QueryKeyEnum.DASHBOARD_ALERTS_BY_TYPE]
  })

  return {
    alertsByType: data,
    ...response
  }
}
