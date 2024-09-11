"use client";

import { signOut } from "next-auth/react";
import { deleteCartCookie } from "../../../../lib/actions/deleteCartCookie";
import { Button } from "@/app/_components/ui/button";

export const AccountPageLogoutButton = () => {
  const logoutHander = () => {
    deleteCartCookie();

    signOut({ callbackUrl: "/login" });
  };

  return (
    <section>
      <Button onClick={logoutHander} variant="destructive" className="w-full">
        Logout
      </Button>
    </section>
  );
};
