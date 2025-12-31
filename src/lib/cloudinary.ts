import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: string,
  folder: string = 'occult369/profiles'
): Promise<{ secure_url: string; public_id: string }> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });
    
    return result;
  } catch (error) {
    throw new Error('Failed to upload image');
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<{ result: string } | undefined> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Failed to delete image');
  }
};

export const generateDefaultAvatar = (name: string, size: number = 200): string => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=6b21a8&color=ffffff&size=${size}&bold=true`;
};

export const extractPublicId = (url: string): string | null => {
  try {
    const matches = url.match(/\/v\d+\/(.+)\./);
    return matches ? matches[1] : null;
  } catch (error) {
    return null;
  }
};

export default cloudinary;