import { User } from "@prisma/client";
import { authenticate } from "backend/authenticate";
import { prisma } from "backend/db";
import { UnauthorizedError } from "backend/errors";
import {
  MockNextRequest,
  MockNextResponse,
  mockRequestResponse,
} from "backend/helpers/test-helpers";
import handler from "pages/api/user/[id]";

jest.mock("backend/authenticate", () => ({
  authenticate: jest.fn(),
}));

const authMock = authenticate as jest.Mock;

describe("update user profile", () => {
  let request: MockNextRequest;
  let response: MockNextResponse;
  beforeEach(() => {
    request = mockRequestResponse().request;
    response = mockRequestResponse().response;
    request.method = "PUT";
    request.query.id = "1";
  });
  describe("when user is not logged in", () => {
    test("responds with 401", async () => {
      authMock.mockRejectedValueOnce(new UnauthorizedError());
      await handler(request, response);
      expect(response.statusCode).toBe(401);
    });
  });

  describe("when user is logged in", () => {
    let user: User;
    beforeEach(async () => {
      user = await prisma.user.upsert({
        where: { email: "test@example.com" },
        update: {},
        create: {
          email: `test@example.com`,
        },
      });
      authMock.mockResolvedValue(user);
    });

    describe("when user updates their own profile", () => {
      beforeEach(() => {
        request.query.id = `${user.id}`;
      });

      describe("when request body is valid", () => {
        beforeEach(async () => {
          request.body = {
            name: "Jane Doe",
            bio: "My markdown bio\n __some formatting__",
          };
        });
        test("responds with 200", async () => {
          await handler(request, response);
          expect(response.statusCode).toBe(200);
        });

        test("updates the user", async () => {
          await handler(request, response);
          const updatedUser = await prisma.user.findUnique({
            where: { id: user.id },
          });

          expect(updatedUser).toMatchObject(request.body);
        });
      });
    });

    describe("when user updates other user's profile", () => {
      beforeEach(() => {
        request.query.id = `${user.id + 1}`;
      });

      test("responds with 401", async () => {
        await handler(request, response);
        expect(response.statusCode).toBe(401);
      });
    });
  });
});
