"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { deleteCartCookie } from "../../../lib/actions/deleteCartCookie";

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
