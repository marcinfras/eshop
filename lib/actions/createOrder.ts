"use server";

import { getEnv } from "@/app/utils/utils";
import { Stripe } from "stripe";
import { fetchCart } from "./fetchCart";

const stripeClient = new Stripe(getEnv(process.env.STRIPE_KEY), {
  apiVersion: "2024-06-20",
});

export const createOrder = async () => {
  const cart = await fetchCart();

  const stripeBill = await stripeClient.paymentLinks.create({
    payment_method_types: ["p24"],
    line_items: [{ price: "100", quantity: 1 }],
    currency: "USD",
  });
  console.log("Billllllllllllll: " + stripeBill);
  return stripeBill;
};
