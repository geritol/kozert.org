import { authenticate } from "backend/authenticate";
import { prisma } from "backend/db";
import { UnauthorizedError, ValidationError } from "backend/errors";
import { httpMethodSwitch } from "backend/helpers/http-method-switch";
import { prefixedImageUrl } from "backend/image";
import { NextApiHandler } from "next";
import { userSchema } from "shared/validations";

const put: NextApiHandler = async (request, response) => {
  const user = await authenticate(request);
  const userId = request.query.id;

  if (userId !== `${user.id}`) {
    throw new UnauthorizedError();
  }

  const { name, bio, image } = await userSchema
    .validate(request.body, { abortEarly: false, stripUnknown: true })
    .catch((error) => {
      throw new ValidationError(error.errors);
    });

  await prisma.user.update({
    data: {
      name,
      bio,
      image: image && prefixedImageUrl(image),
    },
    where: {
      email: user.email,
    },
  });

  response.status(200).json({});
};

export default httpMethodSwitch({ put });
