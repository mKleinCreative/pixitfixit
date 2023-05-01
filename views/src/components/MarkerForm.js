import React from "react";
import {Box, TextField, Button} from "@mui/material";
import ImageUpload from '../cloudinary/index.js'

const MarkerForm = (props) => {
    
  return (
        <form onSubmit={props.onSubmit}>
            <TextField label="Picture of Pothole" name="picture" />
            <ImageUpload setImgUrl={props.setImgUrl}/>
            <Button type="submit">Submit</Button>
        </form>
  );
};

export default MarkerForm
