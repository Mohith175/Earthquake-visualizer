export function normalizeFeatures(features) {
  return features.map(f => {
    const [lng, lat, depth] = f.geometry.coordinates;
    return {
      id: f.id,
      lat,
      lng,
      mag: f.properties.mag,
      depth,
      time: new Date(f.properties.time),
      place: f.properties.place
    };
  });
}