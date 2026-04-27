import { login } from '@/services/auth/login'
import { useMutate } from '../useMutate'
import { QueryKeyEnum } from '@/domain/enums/query-keys.enum'
import { useAuth } from '@/providers/AuthProvider'
import { toast } from 'sonner'

export const useMutateLogin = () => {
  const { login: setAuth } = useAuth()

  const mutate = useMutate({
    mutationFn: login,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: ({ token }) => {
      setAuth(token)
      toast.success('Login realizado com sucesso')
    },
    onError: () => {
      toast.error('Credenciais inválidas')
    }
  })

  return mutate
}
