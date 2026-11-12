import { api, tokenStorage } from '@/Services/api/api'
import { isMockCredentialValid, mockUser, MOCK_TOKEN } from '@/Mocks/auth.mock'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
  neighborhoodHero?: string
  role?: 'morador' | 'business_owner' | 'admin'
}

export interface LoginCredentials {
  identifier: string
  password?: string
  rememberMe?: boolean
}

export interface AuthResponse {
  user: User
  token: string
}

/** true = usuario mock. Para el backend real: VITE_USE_MOCK=false en el .env */
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  /** POST /api/v1/auth/login → { user, token } */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    let response: AuthResponse

    if (USE_MOCK) {
      await delay(800)
      if (!isMockCredentialValid(credentials.identifier, credentials.password)) {
        throw new Error('Credenciais inválidas. Verifique seus dados.')
      }
      response = { user: mockUser, token: MOCK_TOKEN }
    } else {
      const { data } = await api.post<AuthResponse>('/api/v1/auth/login', {
        identifier: credentials.identifier,
        password: credentials.password,
      })
      response = data
    }

    tokenStorage.set(response.token, credentials.rememberMe ?? true)
    return response
  },

  /** GET /api/v1/me → User */
  async getProfile(): Promise<User> {
    if (USE_MOCK) {
      await delay(300)
      return mockUser
    }
    const { data } = await api.get<User>('/api/v1/me')
    return data
  },

  /** POST /api/v1/auth/logout */
  async logout(): Promise<void> {
    try {
      if (!USE_MOCK) await api.post('/api/v1/auth/logout')
    } finally {
      tokenStorage.clear()
    }
  },
}