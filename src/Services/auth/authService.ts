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

export const authService = {
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // TODO: Reemplazar con endpoint real `api.post('/auth/login', credentials)`
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simula latencia de red

    if (!credentials.identifier) {
      throw new Error('Credenciales inválidas')
    }

    const mockUser: User = {
      id: 'usr_123',
      name: 'Miguel Cavalcante',
      email: credentials.identifier.includes('@') ? credentials.identifier : 'miguel@ejemplo.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      neighborhoodHero: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop',
      role: 'morador'
    }

    const mockToken = 'bearer_mock_pwa_token_vi_2026'
    localStorage.setItem('kubix_ctx_token', mockToken)

    return {
      user: mockUser,
      token: mockToken,
    }
  },

  async getProfile(): Promise<User> {
    // TODO: Reemplazar con endpoint real `api.get('/me')`
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      id: 'usr_123',
      name: 'Miguel Cavalcante',
      email: 'miguel@ejemplo.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      neighborhoodHero: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop',
      role: 'morador'
    }
  },

  async logout(): Promise<void> {
    // TODO: Reemplazar con endpoint real `api.post('/logout')`
    localStorage.removeItem('kubix_ctx_token')
  },
}