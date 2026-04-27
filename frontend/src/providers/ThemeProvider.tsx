'use client'

import { ThemeEnum } from '@/domain/enums/theme.enum'
import { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextValue = {
  theme: ThemeEnum
  setTheme: (t: ThemeEnum) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: ThemeEnum.LIGHT,
  setTheme: () => {}
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeEnum>(ThemeEnum.LIGHT)

  const setTheme = (t: ThemeEnum) => {
    localStorage.setItem('theme', t)
    setThemeState(t)
    document.documentElement.classList.toggle('dark', t === ThemeEnum.DARK)
  }

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as ThemeEnum | null) ?? ThemeEnum.LIGHT
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration: localStorage só existe no cliente
    setThemeState(saved)
    document.documentElement.classList.toggle('dark', saved === ThemeEnum.DARK)
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
