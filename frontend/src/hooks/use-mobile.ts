'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(max-width: 767px)'

export const useIsMobile = () =>
  useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(QUERY)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(QUERY).matches,
    () => false
  )
