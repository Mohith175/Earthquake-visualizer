# Earthquake Visualizer
A React + Vite project to visualize recent earthquakes on an interactive map with filters and live statistics.

---

## Overview

Earthquake Visualizer fetches real-time earthquake data from the [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/), and displays it on a Leaflet map. Users can filter earthquakes, view stats, and explore interactive markers.

---

## Features
|       Feature      |                                   Description                                    |
|--------------------|----------------------------------------------------------------------------------|
| Interactive Map    | Earthquake markers with popups for details like magnitude, location, and time    |
| Map Layers         | Toggle between different map styles: streets, terrain, satellite                 |
| Filters            | Filter earthquakes by time range, magnitude, and depth                           |
| Stats Panel        | Shows total earthquakes, maximum magnitude, average depth, and last updated time |
| Info Popup         | Magnitude color guide for quick reference                                        |
| Reset View Button  | Resets map to default center and zoom                                            |
| Map Type Switching | Toggle between different map styles (streets, satellite, terrain)                |
| Responsive Design  | Works on mobile, tablet, and desktop                                             |

---

## Project Structure
```
earthquake-visualizer/
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── info/
│   │   │   ├── Info.jsx
│   │   │   └── Info.css
│   │   ├── navbar/
│   │   │   ├── NavBar.jsx
│   │   │   └── NavBar.css
│   │   ├── reset view/
│   │   │   ├── ResetViewButton.jsx
│   │   │   └── ResetViewButton.css
│   │   ├── MapView\.jsx
│   │   └── BaseLayers.jsx
│   ├── App.js
│   └── index.js
└── package.json
```
---

## Tools & Technologies

- React (component-based UI)  
- Vite (fast development server and build tool)  
- Leaflet (interactive maps)  
- JavaScript, HTML, CSS  
- USGS Earthquake API (real-time earthquake data)  

---

## Installation & Setup

1. Clone the repository:

```
git clone https://github.com/<your-username>/Earthquake-visualizer.git
cd Earthquake-visualizer
````

2. Install dependencies:

```
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser (Vite will provide a local URL, e.g., `http://localhost:5173`).

---

## Development Process

1. **Project Setup:** Initialized Vite + React project and installed Leaflet for map integration.
2. **UI Design:** Designed responsive map, filter controls, buttons, and info panels with CSS and media queries.
3. **Feature Implementation:**
   * Fetch and display earthquake data from USGS API
   * Interactive map with markers and popups
   * Map layers switcher (streets, terrain, satellite)  
   * Filters for time, magnitude, and depth
   * Stats panel with real-time summary
   * Info popup with magnitude color guide
   * Reset view button for map navigation
4. **Responsive Design:** Ensured usability across mobile, tablet, and desktop devices.
