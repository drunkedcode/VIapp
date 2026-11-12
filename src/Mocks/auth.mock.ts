interface MockUser {
  id: string
  name: string
  email: string
  avatarUrl: string
  neighborhoodHero: string
  role: 'morador'
}

/** Credenciales válidas en modo mock */
const MOCK_LOGIN = {
  email: 'miguel@vi.app',
  phone: '41999999999', // solo dígitos
  password: '123456',
}

export const MOCK_TOKEN = 'mock_vi_token'

export const mockUser: MockUser = {
  id: 'usr_123',
  name: 'Miguel Cavalcante',
  email: MOCK_LOGIN.email,
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  neighborhoodHero:
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop',
  role: 'morador',
}

export function isMockCredentialValid(identifier: string, password?: string): boolean {
  const id = identifier.trim().toLowerCase()
  const digits = id.replace(/\D/g, '')
  const identifierOk = id === MOCK_LOGIN.email || digits === MOCK_LOGIN.phone
  return identifierOk && password === MOCK_LOGIN.password
}