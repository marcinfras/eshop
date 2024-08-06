import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAccountByEmail } from "../../../../../lib/graphql";

const route = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;

          const account = await getAccountByEmail(credentials.email);

          if (!account) return null;

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            account.password
          );
          if (!isValidPassword) return null;

          return account;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token, trigger, newSession }) {
      // Ensure session.user exists
      if (!session.user) {
        session.user = {};
      }

      session.user.name = token.name as string;

      if (trigger === "update" && newSession?.name) {
        session.user.name = newSession.name;
      }

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.name = user.name;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },
  },
}) satisfies NextAuthOptions;

export { route as GET, route as POST };
