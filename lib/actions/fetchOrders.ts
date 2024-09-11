"use server";

import { revalidateTag } from "next/cache";
import { getOrdersByEmailHygraph } from "../graphql";
import { redirect } from "next/navigation";

export const fetchOrders = async (email: string) => {
  if (!email) return [];

  const orders = await getOrdersByEmailHygraph(email);

  if ("error" in orders) {
    return { error: orders.error };
  }

  revalidateTag("orders");

  console.log(orders);

  return orders;
};
