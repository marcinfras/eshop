// "use client";
"use server";

import Link from "next/link";

import { AccountNavIcon } from "./AccountIcon";
import { Loader } from "./Loader";
import { fetchCart } from "../../../lib/actions/fetchCart";
import { UserStatusNav } from "./UserStatusNav";

// export const dynamic = "force-dynamic";

export const MainNav = async () => {
  const cart = await fetchCart();

  // console.log("MainNavCartttttttttt: " + cart);

  return (
    <nav className="flex items-center justify-between h-16 px-4 bg-background border-b md:px-6">
      {/* {JSON.stringify(cart, null, 4)} */}
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
        <UserStatusNav />
      </div>
    </nav>
  );
};
