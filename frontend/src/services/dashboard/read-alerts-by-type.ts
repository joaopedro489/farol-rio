import apiRequest from '@/lib/api'
import { AlertsByType } from '@/domain/models/dashboard/alerts-by-type.model'

export const readAlertsByType = async (): Promise<AlertsByType> => {
  const response = (await apiRequest<AlertsByType>({
    method: 'GET',
    path: '/api/dashboard/alerts-by-type',
    throwError: true
  })) as AlertsByType

  return new AlertsByType(response)
}
