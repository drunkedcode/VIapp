import { create } from 'zustand'
import { authService, type User, type LoginCredentials } from '@/Services/auth/authService'
import { tokenStorage } from '@/Services/api/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  /** false hasta que fetchAuth termina por primera vez (al abrir o refrescar la app) */
  isInitialized: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  fetchAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.login(credentials)
      set({ user: response.user, isAuthenticated: true, isLoading: false })
    } catch (err: any) {
      set({
        error: err?.message || 'Não foi possível entrar.',
        isLoading: false,
        isAuthenticated: false,
      })
      throw err
    }
  },

  fetchAuth: async () => {
    try {
      if (!tokenStorage.get()) {
        set({ user: null, isAuthenticated: false, isInitialized: true })
        return
      }
      const user = await authService.getProfile()
      set({ user, isAuthenticated: true, isInitialized: true })
    } catch {
      tokenStorage.clear()
      set({ user: null, isAuthenticated: false, isInitialized: true })
    }
  },

  logout: async () => {
    await authService.logout()
    set({ user: null, isAuthenticated: false, isLoading: false })
  },
}))