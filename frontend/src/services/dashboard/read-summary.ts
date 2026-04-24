import apiRequest from '@/lib/api'
import { DashboardSummary } from '@/domain/model/dashboard/summary.model'

export const readSummary = async (): Promise<DashboardSummary> => {
  const response = (await apiRequest<DashboardSummary>({
    method: 'GET',
    path: '/api/dashboard/summary',
    throwError: true
  })) as DashboardSummary

  return new DashboardSummary(response)
}
