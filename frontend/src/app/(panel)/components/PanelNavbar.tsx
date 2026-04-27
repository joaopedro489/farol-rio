'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { ThemeSwitch } from '@/components/theme-switch'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/button'

export const PanelNavbar = () => {
  const { auth, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push(ROUTES.LOGIN.path)
  }

  return (
    <header className='flex h-16 items-center gap-4 border-b border-border bg-background px-6 sticky top-0 z-10'>
      <SidebarTrigger className='cursor-pointer' />
      <div className='flex-1' />
      <ThemeSwitch />
      <div className='text-right'>
        <p className='text-sm font-medium leading-tight'>{auth.preferredUsername}</p>
      </div>
      <Button
        onClick={handleLogout}
        variant={'outline'}
        className='text-muted-foreground hover:text-foreground transition-colors cursor-pointer h-8 w-8 p-0 rounded-md ml-2'
      >
        <LogOut size={18} />
      </Button>
    </header>
  )
}
