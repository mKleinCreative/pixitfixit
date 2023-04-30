import './App.css';
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
import Navbar from './helpers/Navbar.js';
import MarkerDialog from './components/MarkerDialog.js'
import { getCoordinatesFromZipcode } from "./helpers/utils.js";

function App() {
  const [markers, setMarkers] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [zipcode, setZipcode] = useState(null)
  const [viewport, setViewport] = useState({
    lng: 0,
    lat: 0,
    zoom: 10,
  });

     useEffect(() => {
      async function setInitialCoordinates() {
        if (sessionStorage.getItem(JSON.stringify("user"))) {
          console.log(sessionStorage.getItem(JSON.stringify("user")))
          setZipcode("07871");
        }

        const { latitude, longitude } = await getCoordinatesFromZipcode(
          zipcode
        );
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude,
          longitude,
        }));
      }

      setInitialCoordinates();
    }, [zipcode]);
    

  const handleNewMarker = (e) => {
    const longitude = e.lngLat.lng
    const latitude = e.lngLat.lat
    const userData = JSON.parse(sessionStorage.getItem("user"))
    console.log()
    const createdPothole = await axios.post('/potholeRoutes/create', {
      user_id: userData._id,
      photo_url: "https://www.cityworks.com/wp-content/uploads/2020/01/pot-hole-blog.gif",
      lat: latitude,
      long: longitude,
      zipcode: userData.zipcode
    })

    setMarkers(markers => [...markers, {longitude, latitude}])
  };

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  }

  return (
    <>
      
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
              {...viewport}
              style={{ width: "100vw", height: "100vh" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={env.MAPBOX_TOKEN}
              onDblClick={handleNewMarker}
            >
              <Navbar sx={{ backgroundColor: "blue", width: "100%" }} setZipcode={setZipcode}/>
              <GeolocateControl />
              <FullscreenControl />
              <ScaleControl />
              {markers.length
                ? markers.map((m, i) => (
                    // <Marker /> just places its children at the right lat lng.
                    <Marker {...m} key={i} onClick={handleShowPopup}>
                      <img src="imgs/mapbox-marker-icon-20px-gray.png" />
                      {showPopup && (
                        <MarkerDialog
                          open={handleShowPopup}
                          onClose={handleShowPopup}
                          comments={['hi', `${i}`, `${Math.random()}`]}
                        />
                      )}
                    </Marker>
                  ))
                : null}
            </InteractiveMap>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
