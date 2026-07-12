import { v2 as cloudinary } from 'cloudinary'

let configured = false

export function getCloudinaryClient(): typeof cloudinary {
  if (!configured) {
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      secure: true,
    })

    configured = true
  }

  return cloudinary
}
