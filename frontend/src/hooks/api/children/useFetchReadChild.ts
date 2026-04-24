import { readChild, ReadChildParams } from '@/services/children/read-child'
import { useFetch } from '../useFetch'
import { QueryKeyEnum } from '@/domain/enum/query-keys.enum'

export const useFetchReadChild = (params: ReadChildParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => {
      if (!params.id) return Promise.resolve(undefined)
      return readChild(params)
    },
    queryKey: [QueryKeyEnum.CHILD, params.id]
  })

  return {
    child: data,
    ...response
  }
}
