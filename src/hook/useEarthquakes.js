// src/hooks/useEarthquakes.js
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const USGS_DAY = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

function normalizeFeature(f) {
  const [lng, lat, depth] = f.geometry.coordinates
  return {
    id: f.id,
    lat, lng, depth,
    mag: f.properties.mag,
    place: f.properties.place,
    time: f.properties.time, // ms since epoch
    url: f.properties.url,
    title: f.properties.title,
    felt: f.properties.felt
  }
}

async function fetchEarthquakes() {
  const res = await axios.get(USGS_DAY)
  return res.data.features.map(normalizeFeature)
}

export function useEarthquakes() {
  return useQuery(['earthquakes', 'day'], fetchEarthquakes, {
    refetchInterval: 1000 * 60 * 5, // refetch every 5min
    staleTime: 1000 * 60,           // 1min fresh
    retry: 1
  })
}
