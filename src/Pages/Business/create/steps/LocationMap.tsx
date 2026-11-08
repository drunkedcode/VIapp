import { useEffect } from "react";
import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LocationMapProps {
  /** Punto marcado; null si aún no hay. */
  point: { lat: number; lng: number } | null;
  bubbleTitle?: string;
  bubbleSubtitle?: string;
  onPick: (point: { lat: number; lng: number }) => void;
}

const DEFAULT_CENTER: [number, number] = [-25.4284, -49.2733];

// Pino amarillo de VI (SVG, sin imágenes externas)
const PIN = divIcon({
  className: "",
  html: `<svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 1C8.6 1 1 8.6 1 18c0 12.5 17 27 17 27s17-14.5 17-27C35 8.6 27.4 1 18 1z" style="fill:var(--brand-primary);stroke:var(--brand-secondary);stroke-width:2"/>
    <circle cx="18" cy="18" r="6.5" style="fill:var(--brand-secondary)"/>
    <circle cx="18" cy="18" r="2.5" style="fill:var(--color-white)"/>
  </svg>`,
  iconSize: [36, 46],
  iconAnchor: [18, 46],
});

function ClickToPick({ onPick }: Pick<LocationMapProps, "onPick">) {
  useMapEvents({
    click: (e) => onPick({ lat: e.latlng.lat, lng: e.latlng.lng }),
  });
  return null;
}

function Follow({ point }: Pick<LocationMapProps, "point">) {
  const map = useMap();
  const lat = point?.lat;
  const lng = point?.lng;
  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.setView([lat, lng], Math.max(map.getZoom(), 16));
    }
  }, [map, lat, lng]);
  return null;
}

export default function LocationMap({ point, bubbleTitle, bubbleSubtitle, onPick }: LocationMapProps) {
  return (
    <div className="relative isolate h-60 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-light)]">
      <MapContainer
        center={point ? [point.lat, point.lng] : DEFAULT_CENTER}
        zoom={point ? 16 : 12}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickToPick onPick={onPick} />
        <Follow point={point} />
        {point && (
          <Marker
            position={[point.lat, point.lng]}
            icon={PIN}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                onPick({ lat, lng });
              },
            }}
          />
        )}
      </MapContainer>

      {point && bubbleTitle && (
        <div className="pointer-events-none absolute top-3 left-1/2 z-[1100] max-w-[85%] -translate-x-1/2 rounded-[var(--radius-md)] bg-[var(--bg-card)] px-4 py-2 text-center shadow-md">
          <p className="truncate text-sm font-bold text-[var(--text-dark)]">{bubbleTitle}</p>
          {bubbleSubtitle && <p className="truncate text-xs text-[var(--text-muted)]">{bubbleSubtitle}</p>}
        </div>
      )}
    </div>
  );
}
