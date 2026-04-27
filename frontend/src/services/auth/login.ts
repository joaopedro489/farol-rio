import apiRequest from '@/lib/api'

interface ILoginPayload {
  email: string
  password: string
}

interface ILoginResponse {
  token: string
}

export const login = async (body: ILoginPayload) => {
  const response = (await apiRequest<ILoginResponse>({
    method: 'POST',
    path: 'auth/login',
    body,
    throwError: true
  })) as ILoginResponse

  return response
}
