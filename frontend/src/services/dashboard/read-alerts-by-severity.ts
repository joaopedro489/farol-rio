import apiRequest from '@/lib/api'
import { AlertsBySeverity } from '@/domain/models/dashboard/alerts-by-severity.model'

export const readAlertsBySeverity = async (): Promise<AlertsBySeverity> => {
  const response = (await apiRequest<AlertsBySeverity>({
    method: 'GET',
    path: '/api/dashboard/alerts-by-severity',
    throwError: true
  })) as AlertsBySeverity

  return new AlertsBySeverity(response)
}
