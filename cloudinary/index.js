import { config as configureDotenv } from 'dotenv';
import cloudinary from './cloudinary.js';

configureDotenv();

const PotholeImageUrl = 'http://www.clker.com/cliparts/1/d/8/a/13167253271330505170Pothole%20Symbol.svg.thumb.png';

const uploadImage = async (PotholeImageUrl) => {
  try {
    const result = await cloudinary.uploader.upload(PotholeImageUrl, {public_id: "pothole"});
    console.log('Image uploaded successfully:', result.secure_url);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

uploadImage(PotholeImageUrl);

// Generate 
const url = cloudinary.url("pothole", {
  width: 100,
  height: 150,
  Crop: 'fill'
});

