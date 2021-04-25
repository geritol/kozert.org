import { NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import { UnauthorizedError } from "./errors";

export const authenticate = async (req: NextApiRequest): Promise<string> => {
  const session = await getSession({ req });
  if (!session) throw new UnauthorizedError();
  if (!session?.user?.email) throw new UnauthorizedError();
  return session.user.email;
};
