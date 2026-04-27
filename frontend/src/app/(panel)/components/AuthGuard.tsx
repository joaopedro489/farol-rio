'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { ROUTES } from '@/constants/routes'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { auth, isLoaded } = useAuth()
  const router = useRouter()
  const isAuthed = Boolean(auth.userId)

  useEffect(() => {
    if (isLoaded && !isAuthed) router.replace(ROUTES.LOGIN.path)
  }, [isLoaded, isAuthed, router])

  if (!isLoaded || !isAuthed) return null
  return <>{children}</>
}
