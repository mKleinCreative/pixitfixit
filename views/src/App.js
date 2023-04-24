import './App.css';
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import InteractiveMap, { 
  Marker, 
  GeolocateControl, 
  FullscreenControl, 
  ScaleControl,
  useControl,
  Popup
 } from "react-map-gl";
import { useState, useRef, useEffect, useCallback } from 'react'
import env from "react-dotenv";
import { Grid, Box, Modal } from '@mui/material'

function App() {

  const [lng, setLng] = useState(30.5);
  const [lat, setLat] = useState(50.5);
  const [zoom, setZoom] = useState(9);
  const [markers, setMarkers] = useState([]);
  const [showPopup, setShowPopup] = useState(false)

  const handleNewMarker = (e) => {
    console.log(e.lngLat)
    const longitude = e.lngLat.lng
    const latitude = e.lngLat.lat

    setMarkers(markers => [...markers, {longitude, latitude}])
  };
  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  }

  return (
    <Box
      sx={{
        height: "1000px",
      }}
    >
      <Grid container spacing={2} gridTemplateColumns="repeat(12, 1fr)">
        <Grid item xs={12} md={8} lg={10}>
          <InteractiveMap
            item
            doubleClickZoom={false}
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5,
            }}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={env.MAPBOX_TOKEN}
            onDblClick={handleNewMarker}
          >
            <GeolocateControl />
            <FullscreenControl />
            <ScaleControl />
            {markers.length
              ? markers.map((m, i) => (
                  // <Marker /> just places its children at the right lat lng.
                  <Marker {...m} key={i} onClick={handleShowPopup}>

                    <img src="imgs/mapbox-marker-icon-20px-gray.png" />
                    {showPopup && (
                      <Modal
                        onClose={() => setShowPopup(false)}
                      >
                        You are here
                      </Modal>
                    )}
                  </Marker>
                ))
              : null}
          </InteractiveMap>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
