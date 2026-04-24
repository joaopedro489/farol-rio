'use client'

import { ThemeEnum } from '@/domain/enum/theme.enum'
import { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextValue = {
  theme: ThemeEnum
  setTheme: (t: ThemeEnum) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: ThemeEnum.LIGHT,
  setTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeEnum>(ThemeEnum.LIGHT)

  function setTheme(t: ThemeEnum) {
    localStorage.setItem('theme', t)
    setThemeState(t)
    document.documentElement.classList.toggle('dark', t === ThemeEnum.DARK)
  }

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as ThemeEnum | null) ?? ThemeEnum.LIGHT
    setThemeState(saved)
    document.documentElement.classList.toggle('dark', saved === ThemeEnum.DARK)
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
