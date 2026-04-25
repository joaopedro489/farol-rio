import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

type QueryKey = any[]

type InvalidateQueryKeyType<TData, TVariables, TContext> =
  | QueryKey
  | false
  | ((d: TData, v: TVariables, c: TContext) => QueryKey)

type InvalidateManyQueryKeysType<TData, TVariables, TContext> =
  | QueryKey[]
  | ((d: TData, v: TVariables, c: TContext) => QueryKey[])

type InvalidateQueryKey<TData, TVariables, TContext> =
  | { invalidateQueryKey: InvalidateQueryKeyType<TData, TVariables, TContext> }
  | { invalidateManyQueryKeys: InvalidateManyQueryKeysType<TData, TVariables, TContext> }

export type IUseMutateProps<TData, TVariables, TError, TContext> = UseMutationOptions<
  TData,
  TError,
  TVariables,
  TContext
> &
  InvalidateQueryKey<TData, TVariables, TContext> & {
    refetchType?: 'all' | 'active'
  }

export function useMutate<TData, TError = DefaultError, TVariables = void, TContext = unknown>(
  params: IUseMutateProps<TData, TVariables, TError, TContext>
) {
  const queryClient = useQueryClient()

  function invalidateSingle(
    key: InvalidateQueryKeyType<TData, TVariables, TContext>,
    args: [TData, TVariables, TContext]
  ) {
    const resolvedKey = typeof key === 'function' ? key(...args) : key
    if (resolvedKey && resolvedKey.length > 0) {
      queryClient.invalidateQueries({
        queryKey: resolvedKey,
        refetchType: params.refetchType ?? 'active'
      })
    }
  }

  function invalidateMany(
    keys: InvalidateManyQueryKeysType<TData, TVariables, TContext>,
    args: [TData, TVariables, TContext]
  ) {
    const resolvedKeys = typeof keys === 'function' ? keys(...args) : keys
    resolvedKeys.forEach((key) => {
      if (key.length > 0) {
        queryClient.invalidateQueries({
          queryKey: key,
          refetchType: params.refetchType ?? 'active'
        })
      }
    })
  }

  return useMutation<TData, TError, TVariables, TContext>({
    ...params,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      const args: [TData, TVariables, TContext] = [data, variables, onMutateResult as TContext]
      if ('invalidateQueryKey' in params) invalidateSingle(params.invalidateQueryKey, args)
      if ('invalidateManyQueryKeys' in params) invalidateMany(params.invalidateManyQueryKeys, args)
      params.onSuccess?.(data, variables, onMutateResult, mutationContext)
    }
  })
}
