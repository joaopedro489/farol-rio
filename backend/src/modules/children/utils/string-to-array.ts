import { TransformFnParams } from 'class-transformer'

export const stringToArrayTransformer = <T = string>(
  params: TransformFnParams,
  inst?: (v: string) => T,
) => {
  const value = params.value as string | string[] | undefined
  const arr = Array.isArray(value) ? value : (value?.split(',') ?? [])
  return inst ? arr.map((v) => inst(v)) : arr
}
