import { useState, useEffect, useRef } from 'react';
import './NavBar.css';

export default function NavBar({ quakes, onRefresh, onFilterChange, mapType, setMapType}) {
    const [filters, setFilters] = useState({ minMag: 0, maxDepth: 1000, timeRange: "all_day" });
    const [lastUpdated, setLastUpdated] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const infoRef = useRef();

    useEffect(() => {
        if (quakes.length) setLastUpdated(new Date().toLocaleTimeString());
    }, [quakes]);

      // Close info popup if click is outside

    const infoBtnRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                infoRef.current &&
                !infoRef.current.contains(event.target) &&
                infoBtnRef.current &&
                !infoBtnRef.current.contains(event.target)
            ) {
                setShowInfo(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange({
            minMag: newFilters.minMag,
            depthRange: [0, newFilters.maxDepth],
            timeRange: newFilters.timeRange
        });
    };

    const stats = {
        "Total Earthquakes": quakes.length,
        "Max Magnitude": quakes.length ? Math.max(...quakes.map(q => q.mag)).toFixed(1) : 0,
        "Avg Depth": quakes.length ? (quakes.reduce((sum, q) => sum + q.depth, 0) / quakes.length).toFixed(1) : 0,
        "Last Updated": lastUpdated || "—"
    };

    return (
        <div className="navbar-container">
            <div className="navbar-header">
                <div className="navbar-title">🌎 Earthquake Visualizer</div>
                <div className="navbar-buttons">
                    <button className="info-btn" ref={infoBtnRef} onClick={() => setShowInfo(prev => !prev)}>  ℹ️ Info </button>
                    {showInfo && (
                        <div className="info-popup" ref={infoRef}>
                            <b>Magnitude Colors:</b>
                            <ul>
                                <li><span className="color-circle color-yellow"></span> &lt; 5</li>
                                <li><span className="color-circle color-orange"></span> 5 – 6</li>
                                <li><span className="color-circle color-red"></span> ≥ 6</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Filters and Stats */}
            <div className="navbar-content">
                <div className="filters-row">
                    <div className="filter-item">
                        <label>Time Range:</label>
                        <select value={filters.timeRange} onChange={e => handleFilterChange("timeRange", e.target.value)}>
                            <option value="all_hour">Last Hour</option>
                            <option value="all_day">Last 24h</option>
                            <option value="all_week">Last 7d</option>
                            <option value="all_month">Last 30d</option>
                        </select>
                    </div>

                    <div className="filter-item">
                        <label>Min Magnitude:</label>
                        <input type="range" min="0" max="8" step="0.1" value={filters.minMag} onChange={e => handleFilterChange("minMag", Number(e.target.value))} />
                        <span className="range-value">{filters.minMag}</span>
                    </div>

                    <div className="filter-item">
                        <label>Max Depth (km):</label>
                        <input
                            type="number"
                            min="0"
                            max="1000"
                            value={filters.maxDepth === 0 ? '' : filters.maxDepth}
                            placeholder="1000"
                            onChange={e => {
                                let val = Number(e.target.value);
                                if (isNaN(val)) val = 0;
                                val = Math.min(1000, Math.max(0, val));
                                handleFilterChange("maxDepth", val);
                            }}
                        />
                    </div>

                    <div className="filter-item">
                        <label>Map Type:</label>
                        <select value={mapType} onChange={e => setMapType(e.target.value)}>
                            <option value="streets">Streets</option>
                            <option value="satellite">Satellite</option>
                            <option value="terrain">Terrain</option>
                        </select>
                    </div>
                </div>

                {/* Stats row below filters */}
                <div className="stats-row">
                    {Object.entries(stats).map(([label, value]) => (
                        <div className="stat-item" key={label}>
                            <span className="stat-value">{value}</span>
                            <span className="stat-label">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
