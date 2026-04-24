import { readAlertsBySeverity } from '@/services/dashboard/read-alerts-by-severity'
import { useFetch } from '../useFetch'
import { QueryKeyEnum } from '@/domain/enum/query-keys.enum'

export const useFetchAlertsBySeverity = () => {
  const { data, ...response } = useFetch({
    queryFn: readAlertsBySeverity,
    queryKey: [QueryKeyEnum.DASHBOARD_ALERTS_BY_SEVERITY]
  })

  return {
    alertsBySeverity: data,
    ...response
  }
}
