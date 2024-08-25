"use client";

import { useSession } from "next-auth/react";
import { createOrder } from "../../../lib/actions/createOrder";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export const CheckoutButton = () => {
  const { data } = useSession();
  const router = useRouter();
  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() => {
        if (!data?.user?.email) {
          router.push("/login");
          return;
        }
        createOrder(data.user.email);
      }}
    >
      Proceed to Checkout
    </Button>
  );
};
