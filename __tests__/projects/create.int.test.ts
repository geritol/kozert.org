import { getPage } from "next-page-tester";
import { act, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

describe("Create project page", () => {
  test("renders create project page", async () => {
    // mock /api/auth/session
    fetchMock.mockResponseOnce(JSON.stringify({}));

    await act(async () => {
      const { render } = await getPage({
        route: `/projects/create`,
        sharedModules: ["backend/db"],
        useApp: false,
      });
      render();
    });

    expect(screen.getByText("New Project")).toBeInTheDocument();
  });
});
