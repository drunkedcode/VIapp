export interface Business {
  id: string
  name: string
  slug: string
  heroUrl?: string
  logoUrl?: string
  status: 'draft' | 'pending' | 'active'
}

export const businessService = {
  async register(data: Partial<Business>): Promise<Business> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      id: `biz_${Date.now()}`,
      name: data.name || 'Mi Nuevo Negocio',
      slug: data.slug || 'mi-nuevo-negocio',
      heroUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
      status: 'active',
    }
  },

  async getMyBusiness(): Promise<Business | null> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    // Retorna null si el usuario no tiene empresa
    return null
  },
}