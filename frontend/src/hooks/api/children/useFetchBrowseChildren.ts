import { browseChildren, BrowseChildrenParams } from '@/services/children/browse-children'
import { useFetch } from '../useFetch'
import { QueryKeyEnum } from '@/domain/enum/query-keys.enum'

export const useFetchBrowseChildren = (params: BrowseChildrenParams = {}) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseChildren(params),
    queryKey: [QueryKeyEnum.CHILDREN, params]
  })

  return {
    children: data,
    ...response
  }
}
