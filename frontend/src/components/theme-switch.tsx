'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { ThemeEnum } from '@/domain/enums/theme.enum'

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  const isDark = theme === ThemeEnum.DARK

  return (
    <div
      className='flex items-center gap-2 text-muted-foreground cursor-pointer'
      onClick={() => setTheme(isDark ? ThemeEnum.LIGHT : ThemeEnum.DARK)}
    >
      {!isDark ? <Moon size={16} /> : <Sun size={16} />}
    </div>
  )
}
