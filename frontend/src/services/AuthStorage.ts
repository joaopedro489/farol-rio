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
    if (token) {
      this.accessToken = token
      const payload = JSON.parse(atob(token.split('.')[1]))
      this.data = {
        preferredUsername: payload.preferred_username,
        userId: payload.sub,
      }
    }
  }

  set(token: string) {
    localStorage.setItem('AT', token)
    const payload = JSON.parse(atob(token.split('.')[1]))
    this.accessToken = token
    this.data = {
      preferredUsername: payload.preferred_username,
      userId: payload.sub,
    }
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
}

export const AuthStorage = new AuthStorageClass()
