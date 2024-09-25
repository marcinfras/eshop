"use server";

import { cookies } from "next/headers";
import { updateCartHygraph } from "../graphql";
import { revalidateTag } from "next/cache";

export const updateCart = async ({
  prodId,
  quantity,
}: {
  prodId: string;
  quantity: number;
}) => {
  //test
  //test
  const cartId = cookies().get("cart");

  if (!cartId?.value) return { error: "Failed to update cart" };

  const res = await updateCartHygraph({
    cartId: cartId.value,
    prodId,
    quantity,
  });

  if ("error" in res) {
    return { error: res.error };
  }

  revalidateTag("cart");

  return res;
};
