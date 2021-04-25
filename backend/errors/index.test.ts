import { mockRequestResponse } from "backend/helpers/test-helpers";
import { ApiError } from ".";

describe("ApiError", () => {
  class MyError extends ApiError {
    static status = 444;
    static message = "My Error";
  }
  describe("createResponse", () => {
    test("uses the status of the extending class", () => {
      const myError = new MyError();
      const { response } = mockRequestResponse();
      myError.createResponse(response);

      expect(response.statusCode).toBe(444);
    });

    test("defaults to the static message", () => {
      const myError = new MyError();
      const { response } = mockRequestResponse();
      myError.createResponse(response);

      expect(response._getJSONData()).toEqual({ message: "My Error" });
    });

    test("uses constructor message when set", () => {
      const message = "Custom error message";
      const myError = new MyError(message);
      const { response } = mockRequestResponse();
      myError.createResponse(response);

      expect(response._getJSONData()).toEqual({ message });
    });
  });
});
