import apiRequest from '@/lib/api'
import { AlertsByNeighborhood } from '@/domain/model/dashboard/alerts-by-neighborhood.model'

export const readAlertsByNeighborhood = async (): Promise<AlertsByNeighborhood[]> => {
  const response = (await apiRequest<AlertsByNeighborhood[]>({
    method: 'GET',
    path: '/api/dashboard/alerts-by-neighborhood',
    throwError: true
  })) as AlertsByNeighborhood[]

  return response.map((alert) => new AlertsByNeighborhood(alert))
}
