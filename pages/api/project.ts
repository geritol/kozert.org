import { authenticate } from "backend/authenticate";
import { prisma } from "backend/db";
import { ValidationError } from "backend/errors";
import { httpMethodSwitch } from "backend/helpers/http-method-switch";
import { NextApiHandler } from "next";
import { projectSchema } from "shared/validations";

const post: NextApiHandler = async (request, response) => {
  const user = await authenticate(request);

  const { title, description } = await projectSchema
    .validate(request.body, { abortEarly: false, stripUnknown: true })
    .catch((error) => {
      throw new ValidationError(error.errors);
    });

  const project = await prisma.project.create({
    data: {
      title,
      description,
      User: {
        connect: { email: user },
      },
    },
  });

  response.status(201).json({ data: { id: project.id } });
};

export default httpMethodSwitch({ post });
