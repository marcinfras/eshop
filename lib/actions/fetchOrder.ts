"use server";

import { redirect } from "next/navigation";
import {
  getOrderByIdHygraph,
  getOrderByStripeCheckoutIdHygraph,
} from "../graphql";

export const fetchOrderByStripeCheckoutId = async (
  stripeCheckoutId: string
) => {
  const order = getOrderByStripeCheckoutIdHygraph(stripeCheckoutId);
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

  if ("error" in order) {
    return { error: "Failed to get order" };
  }

  if (order.email !== email) {
    return { error: "Failed to get order" };
  }
  return order;
};
