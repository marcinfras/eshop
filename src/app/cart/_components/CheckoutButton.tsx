"use client";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { createOrder } from "../../../../lib/actions/createOrder";

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
