'use client'

import { AuthState, AuthStorage } from '@/services/AuthStorage'
import { useQueryClient } from '@tanstack/react-query'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface AuthContext {
  auth: AuthState
  login: (token: string) => void
  logout: () => void
  isLoaded: boolean
}

export const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    console.log('Hydrating auth state from localStorage...')
    const data = AuthStorage.get()
    console.log('Retrieved data from localStorage:', data)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration de localStorage; setIsLoaded sinaliza fim da hidratação
    if (data) setAuth(data)
    setIsLoaded(true)
  }, [])

  const login = (token: string) => {
    AuthStorage.set(token)
    const data = AuthStorage.get()
    if (data) setAuth(data)
  }

  const logout = useCallback(() => {
    AuthStorage.logout()
    setAuth({})
    queryClient.removeQueries()
    queryClient.clear()
  }, [setAuth, queryClient])

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
