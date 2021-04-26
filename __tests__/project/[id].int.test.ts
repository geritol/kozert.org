import { getPage } from "next-page-tester";
import { act, screen } from "@testing-library/react";
import { prisma } from "backend/db";
import fetchMock from "jest-fetch-mock";

describe("Project page", () => {
  test("renders project page", async () => {
    // mock /api/auth/session
    fetchMock.mockResponseOnce(JSON.stringify({}));
    const project = await prisma.project.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: `test project`,
      },
    });

    await act(async () => {
      const { render } = await getPage({
        route: `/project/${project.id}`,
        sharedModules: ["backend/db"],
      });
      render();
    });

    expect(screen.getByText(project.title)).toBeInTheDocument();
  });
});
