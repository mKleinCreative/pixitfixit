import './App.css';
import mapboxgl from "mapbox-gl";
import { useState, useRef, useEffect } from 'react'
import env from "react-dotenv";
mapboxgl.accessToken = env.MAPBOX_TOKEN;


function App() {
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return (
    <div className="App">
      <header className="App-header">
        <div ref={mapContainer} className="map-container" />
        <p>
          Pixitfixit!!!!
        </p>
      </header>
    </div>
  );
}

export default App;
