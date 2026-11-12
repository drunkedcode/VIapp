import axios from 'axios'

const TOKEN_KEY = 'kubix_ctx_token'

/** Token guardado según "Lembrar-me": localStorage (recordar) o sessionStorage (solo la sesión) */
export const tokenStorage = {
  get: (): string | null =>
    localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY),

  set: (token: string, remember = true): void => {
    tokenStorage.clear()
    ;(remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token)
  },

  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
  },
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: { Accept: 'application/json' },
})

// Envía el token en cada petición
api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Convierte el error de Laravel ({ message }) en un Error normal,
// así el Login muestra error.message directamente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      (error?.response ? 'Credenciais inválidas. Verifique seus dados.' : 'Sem conexão com o servidor.')
    return Promise.reject(new Error(message))
  },
)