import './App.css';
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Map, { 
  Marker, 
  GeolocateControl, 
  FullscreenControl, 
  ScaleControl,
  useControl
 } from "react-map-gl";
import { useState, useRef, useEffect, useCallback } from 'react'
import env from "react-dotenv";
import { Grid, Box } from '@mui/material'

function App() {
  
  const mapRef = useRef();

  const [lng, setLng] = useState(30.5);
  const [lat, setLat] = useState(50.5);
  const [zoom, setZoom] = useState(9);

  const onMapDblClick = useCallback(() => {
    mapRef.current.on('click', (e) => {
      console.log(e.lngLat.lng);
      // Create a new marker.
      return (
        <Marker
          draggable={true}
          longitude={e.lngLat.lng}
          latitude={e.lngLat.lat}
        >
          <img src="/imgs/mapbox-marker-icon-20px-gray.png" />
        </Marker>
      
      );
    })
  }, [])


  function DrawControl(props) {
    console.log('props ',props)
    useControl(() => new MapboxDraw(props), {
      position: props.position,
    });

    return null;
  }

  return (
    <Box
      sx={{
        height: "1000px",
      }}
    >
      <Grid container spacing={2} gridTemplateColumns="repeat(12, 1fr)">
        <Grid item xs={12} md={8} lg={10}>
          <Map
            item
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5,
            }}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={env.MAPBOX_TOKEN}
            ref={mapRef}
            onClick={onMapDblClick}
          >
            <Marker longitude={30.5} latitude={50.5} anchor="bottom">
              <img src="/imgs/mapbox-marker-icon-20px-gray.png" />
            </Marker>
            <GeolocateControl />
            <FullscreenControl />
            <ScaleControl />
            <DrawControl
              position="top-left"
              displayControlsDefault={false}
              controls={{
                polygon: true,
                trash: true,
              }}
            />
          </Map>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
