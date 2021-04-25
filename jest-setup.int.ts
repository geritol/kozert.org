import { prisma } from "backend/db";
import execa from "execa";

beforeAll(async () => {
  await execa.command(`prisma migrate deploy --preview-feature`);
});

afterAll(async () => {
  await prisma.$executeRaw("DROP SCHEMA public CASCADE");
  await prisma.$disconnect();
});
