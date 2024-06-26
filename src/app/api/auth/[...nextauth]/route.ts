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

          if (!(await bcrypt.compare(credentials.password, account.password)))
            return null;

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
}) satisfies NextAuthOptions;

export { route as GET, route as POST };
