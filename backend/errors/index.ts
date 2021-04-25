import { NextApiResponse } from "next";

export class ApiError extends Error {
  static status: number;
  static message: string;

  createResponse(res: NextApiResponse): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(this.constructor["status"]).json(this.createPayload());
  }

  protected createPayload(): { message: string } {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return { message: this.message || this.constructor["message"] };
  }
}

export class UnauthorizedError extends ApiError {
  static status = 401;
  static message = "Unauthorized";
}

export class BadRequestError extends ApiError {
  static status = 400;
  static message = "Bad Request";
}

export class ValidationError extends ApiError {
  static status = 400;
  static message = "Validation Error";
  errors: string[];

  constructor(errors: string[]) {
    super();
    this.errors = errors;
  }

  createPayload(): { message: string; errors: string[] } {
    return { message: ValidationError.message, errors: this.errors };
  }
}

export class NotFoundError extends ApiError {
  static status = 404;
  static message = "Not Found";
}

export class InvalidMethodError extends ApiError {
  static status = 405;
  static message = "Method Not Allowed";
}

export class ForbiddenError extends ApiError {
  static status = 403;
  static message = "Forbidden";
}

export class InternalServerError extends ApiError {
  static status = 500;
  static message = "Internal Server Error";
}

export class ConflictError extends ApiError {
  static status = 409;
  static message = "Conflict";
}
