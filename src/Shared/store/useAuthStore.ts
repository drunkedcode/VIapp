import { create } from 'zustand'
import { authService, type User, type LoginCredentials } from '@/Services/auth/authService'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  fetchAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.login(credentials)
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (err: any) {
      set({
        error: err?.message || 'Error al iniciar sesión',
        isLoading: false,
        isAuthenticated: false,
      })
      throw err
    }
  },

  fetchAuth: async () => {
    set({ isLoading: true })
    try {
      const token = localStorage.getItem('kubix_ctx_token')
      if (!token) {
        set({ user: null, isAuthenticated: false, isLoading: false })
        return
      }

      const user = await authService.getProfile()
      set({ user, isAuthenticated: true, isLoading: false })
    } catch {
      localStorage.removeItem('kubix_ctx_token')
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  logout: async () => {
    await authService.logout()
    set({ user: null, isAuthenticated: false, isLoading: false })
  },
}))