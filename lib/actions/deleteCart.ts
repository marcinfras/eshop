"use server";

import { cookies } from "next/headers";
import { deleteCartHygraph } from "../graphql";
import { deleteCartCookie } from "./deleteCartCookie";

export const deleteCart = async () => {
  const cartId = cookies().get("cart");

  if (!cartId?.value) return { error: "Failed to delete cart" };

  const res = await deleteCartHygraph(cartId.value);

  await deleteCartCookie();

  if ("error" in res) {
    return { error: res.error };
  }
};
