import { ROUTES } from '@/constants/routes'
import { AuthStorage } from '@/services/AuthStorage'
import axios, { AxiosError } from 'axios'

export interface TRequest<T = unknown> {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  queryParams?: Record<string, any>
  pathParams?: Record<string, any>
  headers?: Record<string, any>
  throwError?: boolean
}

export interface RequestError {
  isError: true
  code?: number
  data?: any
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

instance.interceptors.request.use((config) => {
  const token = AuthStorage.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      AuthStorage.logout()
      window.location.href = ROUTES.LOGIN.path
    }
    return Promise.reject(error)
  }
)

function bindPathParams(path: string, pathParams: Record<string, any>): string {
  return Object.keys(pathParams).reduce((result, key) => {
    return result.replace(new RegExp(`:${key}`, 'g'), pathParams[key])
  }, path)
}

function buildQueryString(queryParams: Record<string, any>): string {
  return Object.entries(queryParams)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== '' && value?.length !== 0
    )
    .reduce((query, [key, value]) => {
      return query ? `${query}&${key}=${value}` : `?${key}=${value}`
    }, '')
}

async function apiRequest<T = unknown>({
  path,
  method,
  body: data,
  queryParams,
  pathParams,
  headers: extraHeaders,
  throwError
}: TRequest<T>): Promise<T | RequestError> {
  const boundPath = pathParams ? bindPathParams(path, pathParams) : path
  const query = queryParams ? buildQueryString(queryParams) : ''
  const url = `${boundPath}${query}`

  try {
    const response = await instance({ method, url, data, headers: extraHeaders })
    return response.data as T
  } catch (error: unknown) {
    if (throwError) throw error

    if (!(error instanceof AxiosError)) return { isError: true }
    if (/Network Error/i.test(error.message)) return { isError: true, code: 503 }
    if (!error.response) return { isError: true }

    return {
      isError: true,
      code: error.response.status,
      data: error.response.data
    }
  }
}

export { instance as apiInstance }

export default apiRequest
