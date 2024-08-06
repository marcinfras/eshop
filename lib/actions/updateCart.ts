"use server";

import { cookies } from "next/headers";
import { updateCartHygraph } from "../graphql";

export const updateCart = async ({
  prodId,
  quantity,
}: {
  prodId: string;
  quantity: number;
}) => {
  const cartId = cookies().get("cart");

  // console.log(cartId?.value);
  // console.log(prodId);
  // console.log(quantity);
  // console.log(":titiitiit");
  if (!cartId?.value) return { error: "Failed to update cart" };
  // console.log("tratatata");

  const res = await updateCartHygraph({
    cartId: cartId.value,
    prodId,
    quantity,
  });

  if ("error" in res) {
    return { error: res.error };
  }

  return res.id;
};
