"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const AccountPageLogoutButton = () => {
  return (
    <section>
      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
        variant="destructive"
        className="w-full"
      >
        Logout
      </Button>
    </section>
  );
};
