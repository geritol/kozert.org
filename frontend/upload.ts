export type UploadedFile = {
  name: string;
  preview: string;
  doNotUpload?: boolean;
};
export type PreviewFile = (File & UploadedFile) | UploadedFile;

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const upload = async (
  files: (File | PreviewFile)[],
  options?: { apiUrl?: string; apiKey?: string; preset?: string }
): Promise<string[]> => {
  const CLOUDINARY_API_URL =
    options?.apiUrl || process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
  const CLOUDINARY_API_KEY =
    options?.apiKey || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const UPLOAD_URL = `${CLOUDINARY_API_URL}/image/upload`;
  const CLOUDINARY_PRESET =
    options?.preset || process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

  const timestamp = Math.round(new Date().getTime() / 1000);
  const upload_preset = CLOUDINARY_PRESET as string;
  const { signature } = await fetch("/api/image/sign", {
    method: "POST",
    body: JSON.stringify({ timestamp, upload_preset }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const result = await Promise.all(
    files.map(async (file) => {
      if ((file as PreviewFile).doNotUpload)
        return (file as PreviewFile).preview;
      return fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          file: (await toBase64(file as File)) as string,
          upload_preset,
          api_key: CLOUDINARY_API_KEY as string,
          timestamp: `${timestamp}`,
          signature,
        }),
      }).then((res) => res.json());
    })
  );
  return result.map((i) => i.public_id);
};
