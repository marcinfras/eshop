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
          console.log("11111111trallalalala");
          if (!credentials) return null;
          console.log("2222222222222trallalalala");
          const account = await getAccountByEmail(credentials.email);
          console.log("2chuj2chuj2chuj");

          if (!account) return null;
          bcrypt.compare(credentials.password, account.password);
          return account;
        } catch (error) {
          console.log("tralallalallalalalla");
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
