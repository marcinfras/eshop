"use server";


import {
  getOrderByIdHygraph,
  getOrderByStripeCheckoutIdHygraph,
} from "../graphql";
import { revalidateTag } from "next/cache";

export const fetchOrderByStripeCheckoutId = async (
  stripeCheckoutId: string
) => {
  const order = await getOrderByStripeCheckoutIdHygraph(stripeCheckoutId);
  if ("error" in order) {
    return { error: "Failed to get order" };
  }
  return order;
};

export const fetchOrderById = async ({
  email,
  orderId,
}: {
  email: string;
  orderId: string;
}) => {
  if (!email) throw new Error("Failed to get order");

  const order = await getOrderByIdHygraph(orderId);

  revalidateTag(orderId);

  if ("error" in order) {
    return { error: "Failed to get order" };
  }

  if (order.email !== email) {
    return { error: "Failed to get order" };
  }
  return order;
};
