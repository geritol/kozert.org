import { ApiError } from ".";
import { NextApiHandler } from "next";
import { logger } from "backend/logger";

export default (handler: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof ApiError) {
        return error.createResponse(res);
      }
      logger.error("Internal Server Error:", error);

      return res.status(500).send("Internal Server Error");
    }
  };
