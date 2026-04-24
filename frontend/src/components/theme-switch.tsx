'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { Switch } from '@/components/ui/switch'
import { ThemeEnum } from '@/domain/enum/theme.enum'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === ThemeEnum.DARK

  return (
    <div className='flex items-center gap-2 text-muted-foreground'>
      <Sun size={16} />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? ThemeEnum.DARK : ThemeEnum.LIGHT)}
      />
      <Moon size={16} />
    </div>
  )
}
