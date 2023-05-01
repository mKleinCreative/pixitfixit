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
import { Grid, Box, Modal, Button } from '@mui/material'
import Navbar from './helpers/Navbar.js';
import MarkerDialog from './components/MarkerDialog.js'
import MarkerForm from './components/MarkerForm.js'
// import Dropzone from './components/Dropzone.js'
import { getCoordinatesFromZipcode } from "./helpers/utils.js";
import axios from 'axios'
import { uploadImage } from "./cloudinary/index.js";
import { render } from 'react-dom';

function App() {
  const [markers, setMarkers] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [zipcode, setZipcode] = useState(null)
  const [hasActiveUser, setHasActiveUser] = useState(false)
  const [formOpen, setFormOpen] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [comments, setComments] = useState([]);
  const [viewport, setViewport] = useState({
    lng: 0,
    lat: 0,
    zoom: 10,
  });

    useEffect(() => {
      async function setInitialCoordinates() {
        if (JSON.parse(sessionStorage.getItem("user"))) {
          const userInfo = JSON.parse(sessionStorage.getItem("user"))
          setZipcode(userInfo.zipcode);
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
    }, [hasActiveUser]);

    useEffect(() => {
      async function getMarkersFromUserZip() {
        const markersInZipcode = await axios.get(`/potholeRoutes/all/${zipcode}`)
        let markersArray = []
        markersInZipcode.data.forEach((marker) => {
          let latitude = marker.lat
          let longitude = marker.long
          markersArray.push({latitude, longitude})
        })
        setMarkers(markersArray)
      }
      getMarkersFromUserZip()
    }, [hasActiveUser])
    
    const getComments = async (id) => {
      const comments = axios.get(`/comment/pothole/${id}`)
      setComments(comments);
    }

    const addComment = async (comment) => {
      const payload = {
        comment
      }
      return await axios.post("/create", payload)
    }

  const handleNewMarker = async (e) => {
    const longitude = e.lngLat.lng
    const latitude = e.lngLat.lat
    const userData = JSON.parse(sessionStorage.getItem("user"))

    const createdPothole = await axios.post('/potholeRoutes/create', {
      user_id: userData._id,
      photo_url: imgUrl,
      lat: latitude,
      long: longitude,
      zipcode: userData.zipcode
    })

    setFormOpen(false);
    setMarkers(markers => [...markers, {longitude, latitude}])
  };

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Box
        sx={{
          height: "1000px",
        }}
      >
        <Grid container spacing={2} gridTemplateColumns="repeat(12, 1fr)">
          <Grid item xs={12} md={8} lg={10}>
            <Modal
              open={formOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <MarkerForm onSubmit={handleNewMarker} setImgUrl={setImgUrl} />
                <Button
                  sx={{ mt: 3 }}
                  color="error"
                  variant="outlined"
                  onClick={() => setFormOpen(false)}
                >
                  close
              </Button>
            </Box>
            </Modal>
            <InteractiveMap
              item
              doubleClickZoom={false}
              {...viewport}
              style={{ width: "100vw", height: "100vh" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={env.MAPBOX_TOKEN}
              onDblClick={() => setFormOpen(true)}
            >
              <Navbar
                sx={{ backgroundColor: "blue", width: "100%" }}
                setZipcode={setZipcode}
                setHasActiveUser={setHasActiveUser}
              />
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
                          comments={comments}
                          getComments={getComments}
                          markerInfo={m}
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
