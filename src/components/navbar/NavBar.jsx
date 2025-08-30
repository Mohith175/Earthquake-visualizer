import { useState, useEffect } from 'react';
import './NavBar.css';

export default function NavBar({ quakes, onRefresh, onFilterChange, mapType, setMapType}) {
    const [filters, setFilters] = useState({ minMag: 0, maxDepth: 1000, timeRange: "all_day" });
    const [lastUpdated, setLastUpdated] = useState(null);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        if (quakes.length) setLastUpdated(new Date().toLocaleTimeString());
    }, [quakes]);

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

    const handleMenuToggle = () => {
        setShowControls(!showControls);
    };

    return (
        <div className="navbar-container">
            <div className="navbar-header">
                <div className="navbar-title">🌎 Earthquake Visualizer</div>
                <div className="navbar-buttons">
                    <label className="popup">
                        <input 
                            type="checkbox" 
                            checked={showControls}
                            onChange={handleMenuToggle}
                        />
                        <div className="burger" tabIndex="0">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </label>
                </div>
            </div>

            <div className={`navbar-content ${showControls ? 'show' : ''}`}>
                {/* Filters Section */}
                <div className="section">
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
                            <div className="range-container">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="10" 
                                    step="0.1" 
                                    value={filters.minMag} 
                                    onChange={e => handleFilterChange("minMag", Number(e.target.value))}
                                />
                                <span className="range-value">{filters.minMag}</span>
                            </div>
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
                </div>

                {/* Stats Section */}
                <div className="section">
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
        </div>
    );
}
