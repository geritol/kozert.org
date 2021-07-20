import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { EMAIL_SERVER, EMAIL_FROM } from "backend/config";
import Adapters from "next-auth/adapters";
import { prisma } from "backend/db";

export default NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Providers.Email({
      server: EMAIL_SERVER,
      from: EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.userId = user.id;
      return Promise.resolve(session);
    },
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
});
