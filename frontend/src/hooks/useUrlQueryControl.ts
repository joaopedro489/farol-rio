'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export const useUrlQueryControl = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const buildParams = useCallback(
    (values: Record<string, any>): URLSearchParams => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(values).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          params.delete(key)
        } else if (Array.isArray(value)) {
          params.delete(key)
          value.filter(Boolean).forEach((v) => params.append(key, String(v)))
        } else {
          params.set(key, String(value))
        }
      })
      return params
    },
    [searchParams]
  )

  const setManyQueryParam = useCallback(
    (values: Record<string, any>) => {
      router.push(`${pathname}?${buildParams(values).toString()}`)
    },
    [buildParams, pathname, router]
  )

  const replaceManyQueryParam = useCallback(
    (values: Record<string, any>) => {
      router.replace(`${pathname}?${buildParams(values).toString()}`)
    },
    [buildParams, pathname, router]
  )

  return { setManyQueryParam, replaceManyQueryParam }
}
