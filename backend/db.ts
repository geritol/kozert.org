import { PrismaClient } from "@prisma/client";
import { ENV } from "./config";

let prisma: PrismaClient;

if (ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global["prisma"]) {
    global["prisma"] = new PrismaClient();
  }
  prisma = global["prisma"];
}

export { prisma };
