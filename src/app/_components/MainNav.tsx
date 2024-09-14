"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AccountNavIcon } from "./AccountIcon";
import { Loader } from "./Loader";
import { fetchCart } from "../../../lib/actions/fetchCart";

export const MainNav = () => {
  const { status, data } = useSession();

  const { data: cart, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await fetchCart();
      return data;
    },
  });

  // console.log(data, cart);

  if (status === "loading" || isPending) return <Loader />;

  return (
    <nav className="flex items-center justify-between h-16 px-4 bg-background border-b md:px-6">
      <Link href="/" className="flex items-center gap-2">
        <span>Eshop</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <div className="w-5 h-5" />
          <span className="inline">Cart</span>
          {cart && cart.length > 0 && (
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
              {cart.length}
            </span>
          )}
        </Link>

        {status === "authenticated" && <AccountNavIcon />}
        {status === "unauthenticated" && (
          <Link
            href="/login"
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
