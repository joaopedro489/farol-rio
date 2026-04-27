'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { ROUTES } from '@/constants/routes'

export default function Home() {
  const router = useRouter()
  const { auth, isLoaded } = useAuth()

  useEffect(() => {
    console.log('Auth state:', auth?.userId ? 'Authenticated' : 'Unauthenticated')
    console.log(isLoaded)
    if (!isLoaded) return
    console.log(
      'Redirecting to:',
      auth?.userId ? ROUTES.AUTHENTICATED.DASHBOARD.path : ROUTES.LOGIN.path
    )
    router.replace(auth?.userId ? ROUTES.AUTHENTICATED.DASHBOARD.path : ROUTES.LOGIN.path)
  }, [isLoaded, auth?.userId, router])

  return null
}
