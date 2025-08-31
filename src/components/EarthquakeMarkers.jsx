// src/components/EarthquakeMarkers.jsx
import { CircleMarker, Popup } from 'react-leaflet';
import { useState } from 'react';

export default function EarthquakeMarkers({ quakes }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      {quakes.map((quake) => {
        const isHovered = hoveredId === quake.id;
        return (
          <CircleMarker
            key={quake.id}
            center={[quake.lat, quake.lng]}
            radius={isHovered ? Math.max(4, quake.mag * 2.5) : Math.max(3, quake.mag * 2)}
            pathOptions={{
              fillColor: quake.mag > 5 ? 'red' : quake.mag >= 3 ? 'orange' : 'yellow',
              color: isHovered ? '#fff' : '#000',
              weight: isHovered ? 2 : 1,
              opacity: 1,
              fillOpacity: isHovered ? 0.9 : 0.7
            }}
            eventHandlers={{
              mouseover: () => setHoveredId(quake.id),
              mouseout: () => setHoveredId(null)
            }}
          >
            <Popup>
              <div>
                <strong>Magnitude: {quake.mag}</strong><br/>
                Location: {quake.place}<br/>
                Depth: {quake.depth} km<br/>
                Time: {new Date(quake.time).toLocaleString()}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
