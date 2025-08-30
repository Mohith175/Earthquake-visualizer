import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import BaseLayers from "./BaseLayers";
import EarthquakeMarkers from "./EarthquakeMarkers";
import NavBar from "./navbar/NavBar";
import ResetViewButton from "./reset view/ResetViewButton";
import 'leaflet/dist/leaflet.css';
import Info from "./info/Info"

export default function MapView() {
  const [quakes, setQuakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [filters, setFilters] = useState({
    minMag: 0,
    depthRange: [0, 700],
    timeRange: "all_day"
  });
  const [loading, setLoading] = useState(false);

  const [mapType, setMapType] = useState("streets"); // <-- move mapType here

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${filters.timeRange}.geojson`;
      const response = await fetch(url);
      const data = await response.json();

      const features = data.features.map((f) => {
        const [lng, lat, depth] = f.geometry.coordinates;
        return {
          id: f.id,
          lat,
          lng,
          depth: depth || 0,
          mag: f.properties.mag || 0,
          place: f.properties.place || 'Unknown location',
          time: f.properties.time,
        };

      });

      setQuakes(features);
    } catch (err) {
      console.error("Error fetching earthquakes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [filters.timeRange]);

  // Apply filters
  useEffect(() => {
    const filtered = quakes.filter(
      (q) =>
        q.mag >= filters.minMag &&
        q.depth >= filters.depthRange[0] &&
        q.depth <= filters.depthRange[1]
    );
    setFilteredQuakes(filtered);
  }, [quakes, filters]);

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <NavBar
        quakes={filteredQuakes}
        onRefresh={fetchData}
        onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
        mapType={mapType}        // pass mapType to NavBar
        setMapType={setMapType}  // pass setter to NavBar
      />

      <MapContainer
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        style={{ height: "100vh", width: "100%", paddingTop: "140px" }}
        maxBoundsViscosity={1.0}
        zoomControl={false}   // <-- removes default zoom buttons
        maxBounds={[[-90, -180], [90, 180]]}
      >
        <BaseLayers mapType={mapType} />   {/* pass mapType to BaseLayers */}
        <EarthquakeMarkers quakes={filteredQuakes} />
        <ResetViewButton
          defaultCenter={[0, 0]}
          defaultZoom={2}
        />
      </MapContainer>
      <Info />

      {loading && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          color: 'white',
          fontSize: '1.2rem'
        }}>
          Loading earthquake data...
        </div>
      )}
    </div>
  );
}
