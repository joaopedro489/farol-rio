import apiRequest from '@/lib/api'
import { ChildModel, ChildModelConstructor } from '@/domain/models/child/child.model'

export interface ReadChildParams {
  id: string
}

type ReadChildResponse = ChildModelConstructor

export const readChild = async (params: ReadChildParams): Promise<ChildModel> => {
  const response = (await apiRequest<ReadChildResponse>({
    method: 'GET',
    path: `/api/children/:id`,
    pathParams: {
      id: params.id
    },
    throwError: true
  })) as ReadChildResponse

  return new ChildModel(response)
}
