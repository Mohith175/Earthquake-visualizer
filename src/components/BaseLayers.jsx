import { TileLayer } from "react-leaflet";

export default function BaseLayers({ mapType }) {
  let url, attribution;

  if (mapType === "streets") {
    url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    attribution = "&copy; OpenStreetMap contributors";
  } else if (mapType === "terrain") {
    url = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
    attribution = "Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap";
  } else if (mapType === "satellite") {
    url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
    attribution = "Tiles &copy; Esri &mdash; Source: Esri, Earthstar Geographics";
  }

  return <TileLayer url={url} attribution={attribution} />;
}
