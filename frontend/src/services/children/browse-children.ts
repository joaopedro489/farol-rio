import apiRequest from '@/lib/api'
import { AlertTypeEnum } from '@/domain/enums/alert-type.enum'
import { ReviewStatusEnum } from '@/domain/enums/review-status.enum'
import { BrowseChildren } from '@/domain/models/child/browse-child.model'

export interface BrowseChildrenParams {
  offset?: number
  limit?: number
  name?: string
  neighborhood?: string[]
  type?: AlertTypeEnum[]
  statusReview?: ReviewStatusEnum
}

export const browseChildren = async (params: BrowseChildrenParams): Promise<BrowseChildren> => {
  const response = (await apiRequest<BrowseChildren>({
    method: 'GET',
    path: '/api/children',
    queryParams: params,
    throwError: true
  })) as BrowseChildren

  return new BrowseChildren(response)
}
