import apiRequest from '@/lib/api'

export const browseChildrenNeighborhoods = async (): Promise<string[]> => {
  return apiRequest<string[]>({
    method: 'GET',
    path: '/api/children/neighborhoods',
    throwError: true,
  }) as Promise<string[]>
}
