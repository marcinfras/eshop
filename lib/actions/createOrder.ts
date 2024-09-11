"use server";

import { getEnv } from "@/app/utils/utils";
import { Stripe } from "stripe";
import { fetchCart } from "./fetchCart";
import { redirect } from "next/navigation";
import { createOrderHygraph } from "../graphql";
import { deleteCart } from "./deleteCart";

const stripeClient = new Stripe(getEnv(process.env.STRIPE_KEY), {
  apiVersion: "2024-06-20",
});

export const createOrder = async (email: string) => {
  const cart = await fetchCart();

  if (!cart) throw new Error("Problem to create checkout, cart no exist.");

  const { url, status, id } = await stripeClient.checkout.sessions.create({
    payment_method_types: ["p24", "card"],
    mode: "payment",
    line_items: cart.map(({ quantity, name, price, ...product }) => ({
      quantity,
      price_data: {
        currency: "eur",
        unit_amount: price,
        product_data: { name, images: [product.images.url] },
      },
    })),
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    currency: "eur",
    metadata: {
      items: JSON.stringify(
        cart.map(({ slug, quantity, price }) => ({
          slug,
          quantity,
          price,
        }))
      ),
      email,
    },
  });

  console.log("urlllllllll: " + url);
  console.log("statusssssssss: " + status);

  if (!url) throw new Error();

  await deleteCart();

  redirect(url);
  return;
};
