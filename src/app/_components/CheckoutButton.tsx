"use client";

import { createOrder } from "../../../lib/actions/createOrder";
import { Button } from "./ui/button";

export const CheckoutButton = () => {
  return (
    <Button size="lg" className="w-full" onClick={() => createOrder()}>
      Proceed to Checkout
    </Button>
  );
};
