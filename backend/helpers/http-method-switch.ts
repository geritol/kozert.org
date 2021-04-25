import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import handleError from "backend/errors/handle-error";
import { InternalServerError, InvalidMethodError } from "backend/errors";
import { requireEndedResponse } from ".";

export type HttpMethod = "post" | "get" | "put" | "patch" | "delete" | "head";

export type HttpMethodsHandler = {
  [K in HttpMethod]?: NextApiHandler;
};

export const httpMethodSwitch = (
  handlers: HttpMethodsHandler
): NextApiHandler => {
  return handleError(
    requireEndedResponse(async (req: NextApiRequest, res: NextApiResponse) => {
      if (!req.method)
        throw new InternalServerError("No request method specified");
      const m = req.method.toLowerCase() as HttpMethod;
      const handler = handlers[m];
      if (!handler) throw new InvalidMethodError();
      await handler(req, res);
    })
  );
};
