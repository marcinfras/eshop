import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  connectAccountWithCartHygraph,
  getAccountByEmail,
} from "../../../../../lib/graphql";
import { cookies } from "next/headers";
import {revalidateTag } from "next/cache";
import { getEnv } from "@/app/utils/utils";

const route = NextAuth({
  secret: getEnv(process.env.NEXTAUTH_SECRET),
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

          const cookieCart = cookies().get("cart");

          if (cookieCart?.value) {
            await connectAccountWithCartHygraph({
              email: account.email,
              cartId: cookieCart.value,
            });
          }

          if (!cookieCart?.value && account.cart?.id) {
            cookies().set("cart", account.cart.id, {
              httpOnly: true,
              secure: true,
            });
          }

          revalidateTag("cart");

          return {
            id: account.id,
            email: account.email,
            name: account.name,
            cart: account.cart,
          };
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
