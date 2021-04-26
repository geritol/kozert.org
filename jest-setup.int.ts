import "@testing-library/jest-dom";
import { prisma } from "backend/db";
import execa from "execa";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeAll(async () => {
  await execa.command(`prisma migrate deploy --preview-feature`);
});

beforeEach(async () => {
  fetchMock.resetMocks();
  fetchMock.mockImplementation(async (a) => {
    console.log(`Unmocked request to ${a}`);
    return {} as Response;
  });
});

afterAll(async () => {
  await prisma.$executeRaw("DROP SCHEMA public CASCADE");
  await prisma.$disconnect();
});
