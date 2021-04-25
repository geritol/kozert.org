import { Project } from "@prisma/client";
import { prisma } from "backend/db";

export const getAllProjectIds = async (): Promise<number[]> => {
  const projects = await prisma.project.findMany({ select: { id: true } });
  return projects.map((p) => p.id);
};

export const getProject = async (
  id: number | string
): Promise<Project | undefined> => {
  if (typeof id === "string") {
    id = parseInt(id, 10);
  }
  return prisma.project.findUnique({ where: { id } });
};

export const getProjects = async (): Promise<Project[]> => {
  return prisma.project.findMany({ take: 10 });
};
