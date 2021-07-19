module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: "cloudinary",
    path: process.env.NEXT_PUBLIC_CLOUDINARY_DELIVERY_URL,
  },
};
