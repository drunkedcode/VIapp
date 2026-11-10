import { create } from "zustand";
import { reverseGeocode } from "@/Services/geo/geo.service";
import type { GeoAddress, GeoPoint } from "@/Services/geo/geo.types";

interface GeoLocationState {
  currentPoint: GeoPoint | null;
  currentAddress: GeoAddress | null;
  currentNeighborhood: string | null;
  isTracking: boolean;
  permissionDenied: boolean;
  watchId: number | null;

  initLocation: () => Promise<string | null>;
  startTracking: () => void;
  stopTracking: () => void;
}

function getDistanceInMeters(p1: GeoPoint, p2: GeoPoint): number {
  const R = 6371e3;
  const rad = Math.PI / 180;
  const dLat = (p2.lat - p1.lat) * rad;
  const dLng = (p2.lng - p1.lng) * rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat * rad) *
      Math.cos(p2.lat * rad) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const useGeoLocationStore = create<GeoLocationState>((set, get) => ({
  currentPoint: null,
  currentAddress: null,
  currentNeighborhood: null,
  isTracking: false,
  permissionDenied: false,
  watchId: null,

  initLocation: () => {
    return new Promise((resolve) => {
      const existing = get().currentNeighborhood;
      if (existing) {
        resolve(existing);
        return;
      }

      if (!("geolocation" in navigator)) {
        set({ permissionDenied: true });
        resolve("Geral");
        return;
      }

      let resolved = false;

      // Subimos el timeout a 8 segundos para darle margen real al GPS del navegador / DevTools
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          console.warn(
            "[GEO] Timeout de ubicación alcanzado. Usando valor por defecto.",
          );
          resolve(get().currentNeighborhood || "Geral");
        }
      }, 8000);

      get().startTracking();

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          if (resolved) return;
          const point: GeoPoint = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          try {
            const addr = await reverseGeocode(point);
            if (addr && !resolved) {
              resolved = true;
              clearTimeout(timer);
              const neighborhood = addr.neighborhood || addr.city;
              set({
                currentPoint: point,
                currentAddress: addr,
                currentNeighborhood: neighborhood,
              });
              resolve(neighborhood);
            }
          } catch {
            if (!resolved) {
              resolved = true;
              clearTimeout(timer);
              resolve("Geral");
            }
          }
        },
        (err) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            if (err.code === err.PERMISSION_DENIED) {
              set({ permissionDenied: true });
            }
            resolve("Geral");
          }
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 },
      );
    });
  },

  startTracking: () => {
    if (get().isTracking || !("geolocation" in navigator)) return;

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const newPoint: GeoPoint = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const lastPoint = get().currentPoint;
        const distance = lastPoint
          ? getDistanceInMeters(lastPoint, newPoint)
          : 0;

        if (!lastPoint || distance > 200) {
          set({ currentPoint: newPoint, permissionDenied: false });

          try {
            const address = await reverseGeocode(newPoint);
            if (address) {
              const previousNeighborhood = get().currentNeighborhood;
              const newNeighborhood = address.neighborhood || address.city;

              set({
                currentAddress: address,
                currentNeighborhood: newNeighborhood,
              });

              if (previousNeighborhood !== newNeighborhood) {
                console.log(
                  `[GEO] 🚀 Cambio de barrio detectado: ${previousNeighborhood || "Inicio"} ➔ ${newNeighborhood}`,
                );
              }
            }
          } catch (error) {
            console.error("[GEO] Error al resolver dirección inversa:", error);
          }
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          set({ permissionDenied: true, isTracking: false });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15_000,
        maximumAge: 10_000,
      },
    );

    set({ isTracking: true, watchId });
  },

  stopTracking: () => {
    const { watchId } = get();
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      set({ isTracking: false, watchId: null });
    }
  },
}));
