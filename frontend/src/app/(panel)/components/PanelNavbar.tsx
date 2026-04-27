'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { ThemeSwitch } from '@/components/theme-switch'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'

export const PanelNavbar = () => {
  const { auth, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push(ROUTES.LOGIN.path)
  }

  return (
    <header className='flex h-16 items-center gap-4 border-b border-border bg-background px-6 sticky top-0 z-10'>
      <SidebarTrigger />
      <div className='flex-1' />
      <ThemeSwitch />
      <Separator orientation='vertical' className='h-8' />
      <div className='text-right'>
        <p className='text-sm font-medium leading-tight'>{auth.preferredUsername}</p>
      </div>
      <button
        onClick={handleLogout}
        className='text-muted-foreground hover:text-foreground transition-colors'
        aria-label='Sair'
      >
        <LogOut size={18} />
      </button>
    </header>
  )
}
