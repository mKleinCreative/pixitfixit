import { config as configureDotenv } from 'dotenv';
import cloudinary from './cloudinary.js';

configureDotenv();

export default uploadImage = async (PotholeImageUrl, userId, numberOfPotholesCreated) => {
  try {
    const generatedPublicId = `${userId}_${numberOfPotholesCreated}`;
    const result = await cloudinary.uploader.upload(PotholeImageUrl, {public_id: generatedPublicId});
    console.log('Image uploaded successfully:', result.secure_url);
    const url = cloudinary.url(generatedPublicId, {
      width: 100,
      height: 150,
      Crop: 'fill'
    });

    return url
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

// Generate 

