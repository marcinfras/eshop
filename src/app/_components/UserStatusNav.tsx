"use client";

import { useSession } from "next-auth/react";
import { Loader } from "./Loader";
import { AccountNavIcon } from "./AccountIcon";
import Link from "next/link";

export const UserStatusNav = () => {
  const { status } = useSession();

  if (status === "loading") return <Loader />;

  return (
    <>
      {status === "authenticated" && <AccountNavIcon />}
      {status === "unauthenticated" && (
        <Link
          href="/login"
          className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Login
        </Link>
      )}
    </>
  );
};
