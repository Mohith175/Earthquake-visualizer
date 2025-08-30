import { useMap } from "react-leaflet";
import "./ResetViewButton.css";

export default function ResetViewButton({ defaultCenter = [0, 0], defaultZoom = 2 }) {
  const map = useMap();

  const handleReset = () => {
    map.setView(defaultCenter, defaultZoom);
  };

  return (
    <button className="reset-view-btn" onClick={handleReset}>
      Reset View
    </button>
  );
}
