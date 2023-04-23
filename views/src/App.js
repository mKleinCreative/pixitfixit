import './App.css';
import mapboxgl from "mapbox-gl";
import Map, { Marker } from "react-map-gl";
import { useState, useRef, useEffect } from 'react'
import env from "react-dotenv";
import { Grid, Box } from '@mui/material'

function App() {
  
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(30.5);
  // const [lat, setLat] = useState(50.5);
  // const [zoom, setZoom] = useState(9);

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  // });

  // map.on('click', (e) => {
    
  // })

  // useEffect((e) => {
  //   const potholes = map.queryRenderedFeatures(e.point, {
  //     layers: ["POTHOLES"],
  //   });
  //   if (!potholes.length) {
  //     return;
  //   }
  //   const pothole = potholes[0];

  //   const popup = new mapboxgl.Popup({ offset: [0, -15] })
  //     .setLngLat(pothole.geometry.coordinates)
  //     .setHTML(
  //       `<h3>${pothole.properties.title}</h3><p>${pothole.properties.description}</p>`
  //     )
  //     .addTo(map);
  // },[map])


  return (
    <Box
      sx={{
        height: "1000px",
      }}
    >
      <Grid container spacing={2} gridTemplateColumns="repeat(12, 1fr)" xs={12}>
        <Grid item xs={12} md={8} lg={10}>
          <Map
            item
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5,
            }}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={env.MAPBOX_TOKEN}
          >
            <Marker longitude={-100} latitude={40} anchor="bottom">
              <img src="/imgs/mapbox-marker-icon-20px-gray.png" />
            </Marker>
          </Map>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
