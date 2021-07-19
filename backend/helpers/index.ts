import { InternalServerError } from "backend/errors";
import { NextApiHandler } from "next";

export const requireEndedResponse =
  (handler: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    await handler(req, res);
    if (!res.headersSent)
      throw new InternalServerError("response was not ended properly");
  };
