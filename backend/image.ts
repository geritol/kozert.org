import { CLOUDINARY_DELIVERY_URL } from "./config";

const ignoredImages = new Set([]);

export const prefixedImageUrl = (image: string): string => {
  if (ignoredImages.has(image)) return image;
  return image.startsWith(CLOUDINARY_DELIVERY_URL as string)
    ? image
    : `${CLOUDINARY_DELIVERY_URL}/${image}`;
};
