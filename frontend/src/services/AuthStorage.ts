export interface AuthState {
  preferredUsername?: string
  userId?: number
}

class AuthStorageClass {
  accessToken?: string
  data?: AuthState

  constructor() {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('AT')
    if (token) this.hydrate(token)
  }

  set(token: string) {
    localStorage.setItem('AT', token)
    this.hydrate(token)
  }

  get() {
    return this.data
  }

  getAccessToken() {
    return this.accessToken
  }

  logout() {
    localStorage.removeItem('AT')
    this.accessToken = undefined
    this.data = undefined
  }

  private hydrate(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]))
    console.log('Hydrating auth state with payload:', payload)
    this.accessToken = token
    this.data = {
      preferredUsername: payload.preferredUsername,
      userId: payload.sub
    }
  }
}

export const AuthStorage = new AuthStorageClass()
