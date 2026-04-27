'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { ROUTES } from '@/constants/routes'

const UNAUTHED_ROUTES = [ROUTES.LOGIN.path, ROUTES.SESSION_EXPIRED.path]

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { auth, isLoaded } = useAuth()
  const router = useRouter()
  const isAuthed = Boolean(auth.userId)
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoaded) return
    const isUnauthedRoute = UNAUTHED_ROUTES.includes(pathname)
    if (!isAuthed && !isUnauthedRoute) {
      router.replace(ROUTES.LOGIN.path)
    } else if (isAuthed && isUnauthedRoute) {
      router.replace(ROUTES.AUTHENTICATED.DASHBOARD.path)
    }
  }, [isLoaded, isAuthed, router, pathname])

  if (!isLoaded) return null

  return <>{children}</>
}
