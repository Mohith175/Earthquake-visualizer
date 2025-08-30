import React, { useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet'
import { useEarthquakes } from '../hooks/useEarthquakes'
import { format } from 'date-fns'

function magToColor(mag) {
  if (mag >= 6) return '#d73027'
  if (mag >= 5) return '#fc8d59'
  if (mag >= 3) return '#e6ff8cff'
  return '#68b42eff'
}
function magToRadius(mag) {
  // CircleMarker radius is in pixels; tune as you like
  return Math.max(3, mag * 4)
}

export default function EarthquakeMap({ minMag = 0 }) {
  const { data: quakes, isLoading, error } = useEarthquakes()
  const filtered = useMemo(() => (quakes || []).filter(q => q.mag != null && q.mag >= minMag), [quakes, minMag])

  if (isLoading) return <div style={{padding:20}}>Loading earthquakes…</div>
  if (error) return <div style={{padding:20}}>Error loading data</div>

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {filtered.map(eq => (
        <CircleMarker
          key={eq.id}
          center={[eq.lat, eq.lng]}
          radius={magToRadius(eq.mag)}
          pathOptions={{ color: magToColor(eq.mag), fillOpacity: 0.75, weight: 1 }}
        >
          <Popup>
            <div style={{minWidth:200}}>
              <strong>{eq.title}</strong>
              <div>Mag: {eq.mag}</div>
              <div>Depth: {eq.depth} km</div>
              <div>Time: {format(new Date(eq.time), 'PPpp')}</div>
              <a href={eq.url} target="_blank" rel="noopener noreferrer">Details</a>
            </div>
          </Popup>
          <Tooltip direction="top">{`M ${eq.mag} — ${eq.place}`}</Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
