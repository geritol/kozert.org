import NextImage from "next/image";

const deliveryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_DELIVERY_URL as string;

const isCloudinaryImage = (image: string): boolean =>
  image.startsWith(deliveryUrl);

const removeCloudinaryPrefix = (image: string): string => {
  if (!isCloudinaryImage(image)) return image;
  return image.replace(deliveryUrl, "");
};

export default function Image(
  props: React.ComponentProps<typeof NextImage> & { src: string }
) {
  if (isCloudinaryImage(props.src)) {
    return (
      <NextImage {...props} src={removeCloudinaryPrefix(props.src) as any} />
    );
  }
  return (
    <img
      src={props.src}
      style={{ height: props.height, width: props.width }}
      className={`${props.className || ""} inline`}
    />
  );
}
