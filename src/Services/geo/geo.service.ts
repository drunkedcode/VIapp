import type { AddressQuery, GeoAddress, GeoPoint } from './geo.types'

// Nominatim (OpenStreetMap): geocodificación directa e inversa. Uso moderado: 1 consulta por segundo.
const NOMINATIM = 'https://nominatim.openstreetmap.org'

interface SearchRow {
  lat: string
  lon: string
}

interface ReverseResponse {
  address?: Record<string, string>
}

/** Dirección -> punto. Devuelve null si no la encuentra. */
export async function geocodeAddress(a: AddressQuery, signal?: AbortSignal): Promise<GeoPoint | null> {
  const attempts = [
    [`${a.street} ${a.number}`, a.neighborhood, a.city, a.state, 'Brasil'],
    [a.street, a.city, a.state, 'Brasil'],
  ]

  for (const parts of attempts) {
    const q = parts.map((p) => p.trim()).filter(Boolean).join(', ')
    const url = `${NOMINATIM}/search?format=jsonv2&limit=1&countrycodes=br&accept-language=pt-BR&q=${encodeURIComponent(q)}`
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error('geocoder')
    const rows: SearchRow[] = await res.json()
    if (rows[0]) return { lat: Number(rows[0].lat), lng: Number(rows[0].lon) }
  }
  return null
}

/** Punto -> dirección. */
export async function reverseGeocode(point: GeoPoint, signal?: AbortSignal): Promise<GeoAddress | null> {
  const url = `${NOMINATIM}/reverse?format=jsonv2&addressdetails=1&accept-language=pt-BR&lat=${point.lat}&lon=${point.lng}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error('geocoder')
  const data: ReverseResponse = await res.json()
  const a = data.address
  if (!a) return null

  return {
    street: a.road ?? a.pedestrian ?? '',
    number: a.house_number ?? '',
    neighborhood: a.suburb ?? a.neighbourhood ?? a.quarter ?? '',
    city: a.city ?? a.town ?? a.village ?? a.municipality ?? '',
    state: (a['ISO3166-2-lvl4'] ?? '').split('-')[1] ?? '',
  }
}

/** Ubicación del dispositivo (pide permiso al usuario). */
export function getCurrentPoint(): Promise<GeoPoint> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('geolocation'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10_000 },
    )
  })
}
