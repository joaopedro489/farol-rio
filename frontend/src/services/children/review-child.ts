import apiRequest from '@/lib/api'

export interface ReviewChildParams {
  id: string
}

export const reviewChild = (params: ReviewChildParams): Promise<boolean> =>
  apiRequest<boolean>({
    method: 'PATCH',
    path: `/api/children/:id/review`,
    pathParams: {
      id: params.id
    },
    throwError: true
  }) as Promise<boolean>
