import { User } from "@prisma/client";
import { prisma } from "backend/db";

export const getAllUserIds = async (): Promise<number[]> => {
  const users = await prisma.user.findMany({ select: { id: true } });
  return users.map((p) => p.id);
};

export const getUser = async (
  id: number | string
): Promise<User | undefined> => {
  if (typeof id === "string") {
    id = parseInt(id, 10);
  }
  return prisma.user.findUnique({ where: { id } });
};
