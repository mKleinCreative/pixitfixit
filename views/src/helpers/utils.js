import env from "react-dotenv";
import axios from 'axios'

async function getCoordinatesFromZipcode(zipcode) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipcode}.json?country=US&access_token=${env.MAPBOX_TOKEN}`
  );
  const [longitude, latitude] = response.data.features[0].center;
  return { latitude, longitude };
}

export {
    getCoordinatesFromZipcode
}