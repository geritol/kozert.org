import { User } from ".prisma/client";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "./db";
import { UnauthorizedError } from "./errors";

export const authenticate = async (req: NextApiRequest): Promise<User> => {
  const session = await getSession({ req });
  if (!session) throw new UnauthorizedError();
  if (!session?.user?.email) throw new UnauthorizedError();
  return prisma.user.findUnique({ where: { email: session.user.email } });
};
