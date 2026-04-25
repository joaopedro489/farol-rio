'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useMutateLogin } from '@/hooks/api/auth/useMutateLogin'

import { LoginForm } from './LoginForm'
import { LeftSideLogin } from './LeftSideLogin'

const schema = z.object({
  email: z.email('Email inválido').min(1, 'Email obrigatório'),
  password: z.string().min(1, 'Senha obrigatória')
})

export type LoginFormData = z.infer<typeof schema>

export const LoginContent = () => {
  const { mutate, isPending } = useMutateLogin()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = (data: LoginFormData) => {
    mutate(data)
  }

  return (
    <div className='min-h-screen flex'>
      <LeftSideLogin />

      <div className='flex flex-1 items-center justify-center p-8'>
        <div className='w-full max-w-sm space-y-6'>
          <div className='space-y-1'>
            <h1 className='text-2xl font-semibold'>Entrar no painel</h1>
            <p className='text-sm text-muted-foreground'>Use suas credenciais institucionais.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <LoginForm control={form.control} />
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Entrando...' : 'Acessar painel →'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
