export interface GeoPoint {
  lat: number
  lng: number
}

export interface GeoAddress {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string // sigla de 2 letras
}

export interface AddressQuery {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
}
