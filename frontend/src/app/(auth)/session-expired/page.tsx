'use client'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const SessionExpiredPage = () => {
  const router = useRouter()

  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='bg-surface border border-border rounded-xl p-12 flex flex-col items-center gap-6 max-w-md w-full mx-4 text-center'>
        <div className='flex items-center justify-center w-14 h-14 rounded-full bg-attention-soft'>
          <Clock size={24} className='text-attention' />
        </div>
        <div className='space-y-2'>
          <h1 className='text-xl font-semibold text-foreground'>Sua sessão expirou</h1>
          <p className='text-sm text-muted-foreground'>
            Por segurança, você foi desconectado. Entre novamente para continuar.
          </p>
        </div>
        <Button variant='default' onClick={() => router.push(ROUTES.LOGIN.path)}>
          Entrar novamente
        </Button>
      </div>
    </div>
  )
}

export default SessionExpiredPage
