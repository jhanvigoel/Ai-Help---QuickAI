import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async ()=>{
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Missing Cloudinary configuration. Please check your environment variables.');
    }
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    console.log('Cloudinary configured successfully');
  } catch (error) {
    console.error('Error configuring Cloudinary:', error.message);
    throw error;
  }
}

export default connectCloudinary;