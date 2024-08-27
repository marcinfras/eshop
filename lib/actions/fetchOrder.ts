"use server";

import { getOrderByStripeCheckoutIdHygraph } from "../graphql";

export const fetchOrderByStripeCheckoutId = async (
  stripeCheckoutId: string
) => {
  const order = getOrderByStripeCheckoutIdHygraph(stripeCheckoutId);
  if ("error" in order) {
    return { error: "Failed to get order" };
  }
  return order;
};
