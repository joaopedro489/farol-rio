import { browseChildrenNeighborhoods } from '@/services/children/browse-children-neighborhoods'
import { useFetch } from '../useFetch'
import { QueryKeyEnum } from '@/domain/enums/query-keys.enum'

export const useFetchChildrenNeighborhoods = () => {
  const { data, ...response } = useFetch({
    queryFn: browseChildrenNeighborhoods,
    queryKey: [QueryKeyEnum.CHILDREN_NEIGHBORHOODS],
  })

  return { neighborhoods: data ?? [], ...response }
}
