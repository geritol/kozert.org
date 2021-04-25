import { authenticate } from "backend/authenticate";
import { ValidationError } from "backend/errors";
import { httpMethodSwitch } from "backend/helpers/http-method-switch";
import { NextApiHandler } from "next";
import * as yup from "yup";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_SECRET } from "backend/config";

export const schema = yup.object().shape({
  timestamp: yup.number().integer().required(), // timestamp in seconds
  upload_preset: yup.string().required(),
});

const post: NextApiHandler = async (request, response) => {
  await authenticate(request);
  const { timestamp, upload_preset } = await schema
    .validate(request.body, { abortEarly: false })
    .catch((error) => {
      throw new ValidationError(error.errors);
    });

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, upload_preset },
    CLOUDINARY_API_SECRET
  );
  response.status(200).json({ signature });
};

export default httpMethodSwitch({ post });
