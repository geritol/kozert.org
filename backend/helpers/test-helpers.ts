import httpMocks, { MockRequest, MockResponse } from "node-mocks-http";
import type { Request, Response } from "express";
import { NextApiRequest, NextApiResponse } from "next";

export type MockNextRequest = MockRequest<NextApiRequest & Request>;
export type MockNextResponse = MockResponse<NextApiResponse & Response>;

export const mockRequestResponse = (): {
  request: MockNextRequest;
  response: MockNextResponse;
} => ({
  request: httpMocks.createRequest<NextApiRequest & Request>(),
  response: httpMocks.createResponse<NextApiResponse & Response>(),
});
