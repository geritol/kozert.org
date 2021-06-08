import { authenticate } from "backend/authenticate";
import { prisma } from "backend/db";
import { UnauthorizedError } from "backend/errors";
import {
  MockNextRequest,
  MockNextResponse,
  mockRequestResponse,
} from "backend/helpers/test-helpers";
import handler from "pages/api/project";

jest.mock("backend/authenticate", () => ({
  authenticate: jest.fn(),
}));

const authMock = authenticate as jest.Mock;

describe("create project", () => {
  let request: MockNextRequest;
  let response: MockNextResponse;
  beforeEach(() => {
    request = mockRequestResponse().request;
    response = mockRequestResponse().response;
    request.method = "POST";
  });
  describe("when user is not logged in", () => {
    test("responds with 401", async () => {
      authMock.mockRejectedValueOnce(new UnauthorizedError());
      await handler(request, response);
      expect(response.statusCode).toBe(401);
    });
  });

  describe("when user is logged in", () => {
    beforeEach(async () => {
      const user = await prisma.user.upsert({
        where: { email: "test@example.com" },
        update: {},
        create: {
          email: `test@example.com`,
        },
      });
      authMock.mockResolvedValue(user);
    });
    describe("when request is valid", () => {
      beforeEach(async () => {
        request.body = {
          title: "Project Title",
          description: "Project Description",
        };
      });
      test("responds with 201", async () => {
        await handler(request, response);
        expect(response.statusCode).toBe(201);
      });

      test("returns a project id", async () => {
        await handler(request, response);
        expect(response._getJSONData()).toMatchObject({
          data: { id: expect.any(Number) },
        });
      });

      test("creates project", async () => {
        await handler(request, response);
        const projectId = response._getJSONData().data.id;
        const project = await prisma.project.findUnique({
          where: { id: projectId },
        });

        expect(project).toMatchObject(request.body);
      });
    });
  });
});
