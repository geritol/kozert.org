const deliveryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_DELIVERY_URL as string;
export const removeCloudinaryPrefix = (image: string): string => {
  if (!image.startsWith(deliveryUrl)) return image;
  return image.replace(deliveryUrl, "");
};
