'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Control } from 'react-hook-form'
import { LoginFormData } from './LoginContent'

type LoginFormProps = {
  control: Control<LoginFormData>
}

export const LoginForm = ({ control }: LoginFormProps) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <FormField
        control={control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder='seu@email.com' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input type={show ? 'text' : 'password'} {...field} />
                <button
                  type='button'
                  onClick={() => setShow(!show)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
